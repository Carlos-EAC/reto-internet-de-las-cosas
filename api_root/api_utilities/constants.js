const readline = require("readline");
const chalk = require("chalk");

const dbCredentials = require("./credentials");

// server general configuration
const serverPort = 3000;
const contextURL = "/iot-challenge";
const projectAPI = "/api";

// GETs
const getCustomersStatus = "/getCustomersStatus";

// POSTs
const addPickup = "/insertPickup";

// SQL queries
// // for selecting values
const getCustomerStatusQuery = `SELECT status FROM customer WHERE rfid = (?)`;

// // for inserting values
const insertPickupQuery = `INSERT INTO pickup (route_id, bus_id) VALUES (?, ?)`;

module.exports = {
    ...dbCredentials,
    serverPort,
    contextURL,
    projectAPI,
    getCustomersStatus,
    addPickup,
    getCustomerStatusQuery,
    insertPickupQuery,
};
