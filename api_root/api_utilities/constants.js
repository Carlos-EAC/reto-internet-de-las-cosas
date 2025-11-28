const readline = require("readline");
const chalk = require("chalk");

const dbConfig = require("./credentials");

// SECTION: CONTEXTO URL --->
const contextURL = "/iot-challenge";
const projectAPI = "/api";
const serverPort = 3000;

// Obtención
const getCustomersStatus = "/getCustomersStatus";

// Inserciones
const addPickup = "/insertPickup";

// -- Querys para la Obtención, Inserción & Eliminado de Datos. --

// Obtención
const getCustomerStatusQuery = `SELECT status FROM customer WHERE rfid = (?)`;

// Inserciones
const insertPickupQuery = `INSERT INTO pickup (route_id, bus_id) VALUES (?, ?)`;

module.exports = {
    serverPort,
    dbConfig,
    contextURL,
    projectAPI,
    getCustomersStatus,
    addPickup,
    getCustomerStatusQuery,
    insertPickupQuery,
};
