const express = require("express");
const router = express.Router();

const constants = require("./constants");
const sensRfid = require("../api/sensorRfid");

router.get(
    constants.contextURL + constants.projectAPI + constants.getCustomers,
    sensRfid.getRegisteredCustomers
);

router.get(
    constants.contextURL + constants.projectAPI + constants.getRoutes,
    sensRfid.getRegisteredRoutes
);

module.exports = router;
