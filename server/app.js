const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//Make the server
let server;
let port = 4000;

//Page listseners (router file)
let router = require("./router.js");
router(app);

//Service listeners (services.js)
let services = require("./services.js");
services(app);

//Start the web server
server = app.listen(port, function (err) {
  if (err) throw err;

  console.log("Listening on Port: " + port);
});
