# Especificación API
## Credenciales de base de datos
Las credenciales de la base de datos remota se encuentran en el archivo `credentials.js` dentro de `api_utilities`, no presente en el repositorio por seguridad. Se debe compartir por privado y poner en la carpeta `api_utilities`. El archivo es similar a lo siguiente:
```js
const dbConfig = {
    name: "nombre_de_bd",
    host: "tu_host",
    port: "tu_puerto",
    user: "usuario_de_bd",
    pass: "contraseña_de_bd",
};

module.exports = {
    dbConfig,
};
```

## Endpoints API
Todos los endpoints inician con `/iot-challenge/api`. Los siguientes endpoints están disponibles:
* POST
    * `/getCustomerStatus`
        * Consulta si el usuario identificado por un dado RFID está aprobado o no. Debido a que se deben mandar datos se usa el método POST, no GET.
        * Inputs:
            * `rfid`: RFID de un usuario. Integer.
        * Outputs:
            * `customer_status`: "APPROVED", "UNAPPROVED", o "UNIDENTIFIED", el último en caso de que el RFID no se encontró en la base de datos (y por ende no tiene acceso). String.
    * `/insertPickup`
        * Inserta un pickup en la base de datos.
        * Inputs:
            * `mac_address`: MAC address del NodeMCU. Este identificador se usa para determinar el autobús y la ruta en cuestión. Integer. A fecha de 30 Noviembre 2025, el mismo API usa el tiempo en el que recibió el request, así que el cliente no lo tiene que mandar.
        * Outputs:
            * (Ninguno).

## Ejemplo de uso
El siguiente código para Arduino usa el endpoint `/insertPickup`:
```
#include <WiFi.h>
#include <HTTPClient.h>

void sendPickup() {
    // convert MAC string to integer (AA:BB:CC:DD:EE:FF → uint64)
    uint64_t macInt = 0;
    uint8_t macBytes[6];
    WiFi.macAddress(macBytes);
    for (int i = 0; i < 6; i++) {
        macInt = (macInt << 8) | macBytes[i]; // bitwise operations
    }

    HTTPClient http;
    http.begin("http://<serverIP>:3000/iot-challenge/api/insertPickup");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    // Build the body: macAddress=12345678901234
    String body = "macAddress=" + String(macInt);

    int httpResponseCode = http.POST(body);

    // for debugging
    Serial.println(httpResponseCode);

    http.end();
}
```
