const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const PORT = config.get("DEV_BACKEND_PORT");

const app = express();

const server = app.listen(process.env.PORT || PORT, async () => {
  console.log(`server started on port ${PORT}`);
});
