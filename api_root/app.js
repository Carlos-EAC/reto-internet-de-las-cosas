// Librería para 'colorear' el output de la terminal.
const chalk = require("chalk");

// Librerías necesarías para creación del server y formateo JSON.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const serverPort = require("./api_utilities/constants").serverPort;
const router = require("./api_utilities/router");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => {
    res.send("Initialized IOT Challenge Server.");
});

app.listen(serverPort, () => {
    console.log(`Server started running on: ${serverPort}`);
});
