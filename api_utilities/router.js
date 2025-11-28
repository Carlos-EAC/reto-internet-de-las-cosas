const express = require("express");
const router = express.Router();

const constants = require("./constants");
const sensRfid = require("../api/sensorRfid");

router.post(
    constants.contextURL + constants.projectAPI + constants.getCustomersStatus,
    sensRfid.getCustomersStatus
);

module.exports = router;
