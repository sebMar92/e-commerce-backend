const express = require("express");
const routes = require("./routes/index.js");
require("./database.js");
const mercadopago = require('mercadopago');

const {PROD_ACCESS_TOKEN} = process.env;

const app = express();
app.name = "API";
mercadopago.configurations.setAccessToken(PROD_ACCESS_TOKEN);
// replacing bodyparser and cookieparser:
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//routes
app.use("/", routes);
// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
