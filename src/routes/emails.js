const router = require("express").Router();
var nodemailer = require("nodemailer");
require("dotenv").config();
const { PASS } = process.env;

router.post("", (req, res) => {
  const { receivers, message, title, products, link, name, type } = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "techstore421@gmail.com",
      pass: PASS,
    },
  });
  let arr = [];
  products.map((i) => {
    return arr.push({
      title: i.title,
      price: i.price,
      images: i.images[0].url,
    });
  });
  let mailOptions = {};
  if (type === "purchase") {
    mailOptions = {
      from: "techstore421@gmail.com",
      to: `${receivers}`,
      subject: `${title}`,
      html: `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">  
      <title>Techstore</title>
    </head>
    <body>
      <h1>Hello ${name}!<h1/>
      <h3>${message}</h3>
      <h4>Thank you for placing your order with TechStore!<h4/>
      <h4>We really appreciate that you chose our store, it means the world to us!<h4/>
      <h4>We hope you enjoy it.<h4/>
      <h4>Have a great day!<h4/>
      <br/>
      <h2>These are the products you have just purchased:<h2/>
      <h4>${arr.map((i) => i.title)}<h4/>
      <h2>See details here: ${link}<h2/>
    </body>
    </html>
  `,
    };
  } else {
    mailOptions = {
      from: "techstore421@gmail.com",
      to: `${receivers}`,
      subject: `${title}`,
      html: `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">  
      <title>Techstore</title>
    </head>
    <body>
      <h1>Hello ${name}!<h1/>
    </body>
    </html>
  `,
    };
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
