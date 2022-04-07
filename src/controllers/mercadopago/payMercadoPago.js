const mercadopago = require('mercadopago');
const { Order, Product } = require('../../database.js');

// app.post("/process-payment", (req, res) => {
const payMercadoPago = (data) => {
  try {
    let preference = {
      items: [],
      back_urls: {
        success: data.baseURL + '/purchase/success',
        failure: data.baseURL + '/purchase/failure',
        pending: data.baseURL + '/purchase/failure',
      },
      auto_return: 'approved',
    };
    data.items.forEach((el) => {
      preference.items.push({
        title: el.title,
        unit_price: Number(el.price),
        quantity: Number(el.amount),
      });
    });
    return preference;
  } catch (err) {
    console.log(err);
  }
};
module.exports = payMercadoPago;
