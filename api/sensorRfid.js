const MySQL = require("../database/MySQLFuncs");
const constants = require("../api_utilities/constants");

async function getRegisteredCustomers(req, res) {
    try {
        let query = constants.getCustomersQuery;
        let qRslt = await MySQL.getData(query);

        res.status(200);
        res.json(qRslt);
    } catch (error) {
        console.log("Error fetching registered customers from DB.");

        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

async function getRegisteredRoutes(req, res) {
    try {
        let query = constants.getRoutesQuery;
        let qRslt = await MySQL.getData(query);

        res.status(200);
        res.json(qRslt);
    } catch (error) {
        console.log("Error fetching registered customers from DB.");

        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    getRegisteredCustomers,
    getRegisteredRoutes,
};
