const mercadopago = require('mercadopago');
const { Order, Product } = require('../../database.js');

// app.post("/process-payment", (req, res) => {
const payMercadoPago = (data) => {

    let preference = {
      items: [],
      back_urls: {
        success: "http://localhost:3000/purchase/success",
        failure: "http://localhost:3000/purchase/failure",
        pending: "http://localhost:3000/purchase/failure",
      },
      auto_return: "approved",
    };
    data.forEach(el => {
      preference.items.push({
        title: el.title,
        unit_price: Number(el.price),
        quantity: Number(el.amount),
      });
    });
    return preference
};
module.exports = payMercadoPago;
