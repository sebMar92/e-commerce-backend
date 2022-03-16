const { Router } = require("express");

// import ruta from "./ruta"
const products = require("./products.js");
const categories = require("./categories.js");
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/ruta', ruta);
router.use("/products", products);
router.use("/categories", categories);

module.exports = router;
