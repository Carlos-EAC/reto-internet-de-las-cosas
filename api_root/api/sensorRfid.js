const MySQL = require("../database/MySQLMngr");
const chalk = require("chalk");
const constants = require("../api_utilities/constants");

async function getCustomersStatus(req, res) {
    try {
        var receivedRfid = req.body.rfidSensor;
        let rfidDecimal = parseInt(receivedRfid, 16);
        let parameters = [rfidDecimal];

        if (receivedRfid === null) {
            return res.status(400).json({
                status: "obtention error",
                description: "couldn't obtain value",
            });
        }

        console.log(
            chalk.yellow(
                `Requesting status for RFID ${receivedRfid}\nNumerical Conversion: ${rfidDecimal}`
            )
        );

        let query = constants.getCustomerStatusQuery;
        let queryResult = await MySQL.getDataWithParams(query, parameters);

        const queryRows = queryResult.getRows();
        const qRowsCount = queryRows.length;

        let customerStatus = "UNIDENTIFIED";
        if (qRowsCount === 0) {
            console.log(chalk.magenta(`User was not found!`));
        } else {
            customerStatus = queryRows[0]["status"];
        }

        console.log(chalk.cyan(`Obtained Status: ${customerStatus}`));
        res.status(200).json({
            status: "success",
            subscription_status: customerStatus,
        });
    } catch (error) {
        console.log("Error getting Customer's status from DB");

        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

async function insertPickup(req, res) {
    try {
        var receivedMacAddress = req.body.macAddress;

        if (receivedMacAddress == null) {
            return res.status(400).json({
                status: "obtention error",
                description: "MAC address is empty",
            });
        }

        console.log(
            chalk.yellow(
                `Attempting to get bus from MAC address ${receivedMacAddress}`
            )
        );
        let query = constants.getBusFromMacAddressQuery;
        let parameters = [receivedMacAddress];
        let queryResult = await MySQL.getDataWithParams(query, parameters);

        queryRows = queryResult.getRows();
        bus_id = queryRows[0]["id"];

        console.log(chalk.yellow(`Attempting to get route from bus ${bus_id}`));
        query = constants.getRouteFromBusQuery;
        parameters = [bus_id];
        queryResult = await MySQL.getDataWithParams(query, parameters);

        queryRows = queryResult.getRows();
        route_id = queryRows[0]["route_id"];

        console.log(
            chalk.yellow(`Attempting to insert pickup with time ${Date()}`)
        );
        query = constants.insertPickupQuery;
        var unformattedTime = new Date(); // looks like this by default: Sun Nov 30 2025 18:52:40 GMT-0600 (Central Standard Time)
        // change it to the MySQL default format: 2025-11-30 18:52:40
        var pickupTime = unformattedTime
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        parameters = [route_id, bus_id, pickupTime];
        queryResult = await MySQL.getDataWithParams(query, parameters);

        res.status(200);
        res.json(queryResult);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    getCustomersStatus,
    insertPickup,
};
