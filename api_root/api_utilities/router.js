const express = require("express");
const router = express.Router();

const constants = require("./constants");
const sensorRfid = require("../api/sensorRfid");

router.post(
    constants.contextURL + constants.projectAPI + constants.getCustomersStatus,
    sensorRfid.getCustomersStatus
);

router.post(
    constants.contextURL + constants.projectAPI + constants.addPickup,
    sensorRfid.insertPickup
);

module.exports = router;
