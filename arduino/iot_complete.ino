/**
 * IOT Challenge - Bus Pickup System
 * Board: NodeMCU 1.0 (ESP-12E Module)
 * * Hardware Connections (Based on your diagram):
 * ---------------------------------------------
 * MFRC522 RFID:
 * SDA (SS) : D0 (GPIO 16)
 * SCK      : D5 (GPIO 14)
 * MOSI     : D7 (GPIO 13)
 * MISO     : D6 (GPIO 12)
 * RST      : 3V3 (Hardwired per your list)
 * GND      : GND
 * 3.3V     : 3.3V
 * * LCD (I2C):
 * SDA      : D2 (GPIO 4)
 * SCL      : D1 (GPIO 5)
 * VCC      : Vin (5V)
 * GND      : GND
 * * Buzzer:
 * POS (+)  : D8 (GPIO 15)
 * NEG (-)  : GND
 */

#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

// USER CONFIGURATION
const char* STASSID = "Tec-IoT";
const char* STAPSK  = "spotless.magnetic.bridge";

// const char* STASSID = "SweetUnicorn";
// const char* STAPSK  = "aglitteringgem";

// Server details (Use your computer's IP, NOT localhost)
const String SERVER_IP = "10.22.140.207"; 
const int SERVER_PORT = 3000;

// API Endpoints
const String URL_STATUS = "/iot-challenge/api/getCustomersStatus";
const String URL_PICKUP = "/iot-challenge/api/insertPickup";

// PIN DEFINITIONS 
#define RST_PIN  99  // Dummy pin (since you hardwired RST to 3V3)
#define SS_PIN   D0  // SDA on RFID Reader
#define BUZZER   D8  

// OBJECT INITIALIZATION 
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance
LiquidCrystal_I2C lcd(0x27, 16, 2); // Set LCD address to 0x27 for 16 chars and 2 line display

// <-- SETUP -->
void setup() {
  Serial.begin(115200);
  
  // 1. Init Pins
  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER, LOW);

  // 2. Init LCD
  Wire.begin(D2, D1); // Explicitly set I2C pins (SDA=D2, SCL=D1)
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("System Booting...");

  // 3. Init WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin(STASSID, STAPSK);
  
  Serial.print("\nConnecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
  lcd.setCursor(0,1);
  lcd.print("WiFi Connected");
  delay(1000);

  // 4. Init SPI & RFID
  SPI.begin();      
  mfrc522.PCD_Init(); 
  
  // Ready State
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("   Scan Card    ");
  Serial.println("System Ready.");
}

// <-- LOOP -->
void loop() {
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  // 1. Get RFID UID as String
  String rfidUid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfidUid += (mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    rfidUid += String(mfrc522.uid.uidByte[i], HEX);
  }
  rfidUid.toUpperCase();
  
  Serial.print("RFID Read: ");
  Serial.println(rfidUid);

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Processing...");

  // 2. Check User Status
  String userStatus = checkCustomerStatus(rfidUid);
  
  // 3. Handle Logic based on response
  handleUserFeedback(userStatus);

  // 4. Prevent re-read immediately
  mfrc522.PICC_HaltA(); 
  mfrc522.PCD_StopCrypto1();
  
  delay(2000); // Wait 2 seconds before next scan
  
  // Reset Screen to Idle
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("   Scan Card    ");
}

// <-- HELPER FUNCTIONS -->

String checkCustomerStatus(String rfid) {
  if (WiFi.status() != WL_CONNECTED) return "ERROR";

  WiFiClient client;
  HTTPClient http;
  
  String url = "http://" + SERVER_IP + ":" + SERVER_PORT + URL_STATUS;
  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");

  // JSON Body
  StaticJsonDocument<200> doc;
  doc["rfidSensor"] = rfid;
  String requestBody;
  serializeJson(doc, requestBody);

  int httpCode = http.POST(requestBody);
  String resultStatus = "UNIDENTIFIED"; // Default

  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("Status Response: " + payload);
    
    StaticJsonDocument<512> respDoc;
    deserializeJson(respDoc, payload);
    
    // Extract status from DB response
    // Logic: Map DB "active" to "APPROVED", else "UNAPPROVED"
    const char* dbStatus = respDoc["subscription_status"];
    
    if (dbStatus) {
      String s = String(dbStatus);
      s.toUpperCase();

      return s;
      if (s == "ACTIVE" || s == "APPROVED") {
        resultStatus = "APPROVED";
      } else {
        resultStatus = "UNAPPROVED";
      }
    }
  } else {
    Serial.printf("[HTTP] POST failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  
  http.end();
  return resultStatus;
}

void insertPickup() {
  if (WiFi.status() != WL_CONNECTED) return;

  WiFiClient client;
  HTTPClient http;

  String url = "http://" + SERVER_IP + ":" + SERVER_PORT + URL_PICKUP;
  http.begin(client, url);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  uint64_t macInt = 0;
  uint8_t  macBytes[6];
  WiFi.macAddress(macBytes);

  for (int i = 0; i < 6; i++) {
    macInt = (macInt << 8) | macBytes[i];
  }

  String body = "macAddress=" + String(macInt);
  int httpResponseCode = http.POST(body);

  Serial.println(httpResponseCode);

  http.end();
}

void handleUserFeedback(String status) {
  lcd.clear();
  lcd.setCursor(0, 0);

  if (status == "APPROVED") {
    // --- APPROVED SEQUENCE ---
    lcd.print("   APPROVED");
    lcd.setCursor(0, 1);
    lcd.print("Enjoy the ride!");
    
    // Distinct Sound: "Happy" Upward Chirp
    tone(BUZZER, 1000); delay(100);
    tone(BUZZER, 2000); delay(100);
    noTone(BUZZER);
    
    // Perform Action
    insertPickup();
    
  } else if (status == "UNAPPROVED") {
    // --- UNAPPROVED SEQUENCE ---
    lcd.print("  UNAPPROVED");
    lcd.setCursor(0, 1);
    lcd.print("Pls Renew Sub.");
    
    // Distinct Sound: Long "Sad" Beep
    tone(BUZZER, 200); delay(1000);
    noTone(BUZZER);
    
  } else {
    // --- UNIDENTIFIED / ERROR SEQUENCE ---
    lcd.print(" UNIDENTIFIED");
    lcd.setCursor(0, 1);
    lcd.print("Contact Support");
    
    // Distinct Sound: 3 Rapid Warning Beeps
    tone(BUZZER, 200); delay(1000);
    noTone(BUZZER);
  }
}