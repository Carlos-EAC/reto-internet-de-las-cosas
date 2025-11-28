const readline = require("readline");
const chalk = require("chalk");

const dbConfig = require("./myCredentials");

// SECTION: CONTEXTO URL --->
const contextURL = "/iot-challenge";
const projectAPI = "/api";
const serverPort = 3000;

// Obtención
const getCustomers = "/getCustomers";
const getCustomersStatus = "/getCustomersStatus";
const getRoutes = "/getRoutes";

// Inserciones
const addCustomer = "/insertCustomer";
const addPickup = "/insertPickup";

const createRoute = "/createRoute";
const createBus = "/createBus";

// -- Querys para la Obtención, Inserción & Eliminado de Datos. --

// Obtención
const getCustomersQuery = `SELECT * FROM customer`;
const getCustomerStatusQuery = `SELECT status FROM customer WHERE rfid = (?)`;

const getRoutesQuery = `SELECT * FROM route`;

// Inserciones
const insertCustomerQuery = `INSERT INTO customer (status, rfid) VALUES (?, ?)`;
const insertPickupQuery = `INSERT INTO pickup (route_id, bus_id) VALUES (?, ?)`;

const createRouteQuery = `INSERT INTO route (name, number) VALUES (?, ?)`;
const createBusQuery = `INSERT INTO bus (route_id, mac_address, license_plate) values (?, ?, ?)`;

module.exports = {
    serverPort,
    dbConfig,
    contextURL,
    projectAPI,
    getCustomers,
    getCustomersStatus,
    getRoutes,
    addCustomer,
    addPickup,
    createRoute,
    createBus,
    getCustomersQuery,
    getRoutesQuery,
    getCustomerStatusQuery,
    insertCustomerQuery,
    insertPickupQuery,
    createRouteQuery,
    createBusQuery,
};
