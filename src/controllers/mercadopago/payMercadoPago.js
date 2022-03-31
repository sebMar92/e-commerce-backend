const mercadopago = require('mercadopago');
const { Order, Product } = require('../../database.js');

require('dotenv').config();
mercadopago.configure({
  access_token: process.env.PROD_ACCESS_TOKEN,
});
// app.post("/process-payment", (req, res) => {
const payMercadoPago = async (data) => {
  try {
    let preference = {
      items: [],
      back_urls: {
        success: data.baseURL + '/',
        failure: data.baseURL + '/',
        pending: data.baseURL + '/',
      },
    };
    for (const order of data) {
      preference.items.push({
        title: order.product.title,
        unit_price: order.product.price,
        quantity: order.product.order.amount,
      });
    }
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    return preferenceId;
  } catch (error) {
    console.log(error);
  }
};
module.exports = payMercadoPago;
