const { Router } = require("express");

// import ruta from "./ruta"
const products = require("./products.js");
const categories = require("./categories.js");
const productByID = require("./productByID");
const users = require("./user.js");
const orders = require("./orders.js");
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/ruta', ruta);
router.use("/products", products);
router.use("/products", productByID);
router.use("/categories", categories);
router.use("/user", users);
router.use("/order", orders);

module.exports = router;
