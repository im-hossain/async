const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
require("dotenv").config();
const dbo = require("./db/conn");
const { connectToMQTT } = require("./connectToMQTT");

// This will help us connect to the database
dbo.connectToServer((error) => {
  console.log(error);
}, connectToMQTT);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
