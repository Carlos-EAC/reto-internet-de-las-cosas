const MySQL = require("../database/MySQLMngr");
const chalk = require("chalk");
const constants = require("../api_utilities/constants");

async function getCustomersStatus(req, res) {
    try {
        var receivedRfid = req.body.rfidSensor;
        let parameters = [receivedRfid];

        if (receivedRfid === null) {
            return res.status(400).json({
                status: "obtention error",
                description: "couldn't obtain value",
            });
        }

        console.log(
            chalk.yellow(`Attempting to get status to rfid ${receivedRfid}`)
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
