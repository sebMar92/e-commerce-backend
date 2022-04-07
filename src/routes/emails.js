const router = require('express').Router();
var nodemailer = require('nodemailer');
require('dotenv').config();
const { PASS } = process.env;

router.post('', (req, res) => {
  try {
    const { receivers, message, title, products, link, name, types } = req.body;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'techstore421@gmail.com',
        pass: PASS,
      },
    });
    let mailOptions = {};
    if (types) {
      mailOptions = {
        from: 'techstore421@gmail.com',
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
      <h4>${products.map((i) => i.title)}<h4/>
      <h2>See details here: ${link}<h2/>
    </body>
    </html>
  `,
      };
    } else {
      mailOptions = {
        from: 'techstore421@gmail.com',
        to: `${receivers}`,
        subject: `${title}`,
        html: `
    <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">  
          <title>${title}</title>
          <style>
            section {
              width: 100%;
              justify-content: center;
            }
            
            h1 {
              display: inline-block;
              color: black;
              text-align: center;
            }
            img {
              display: inline-block;
              text-align: center;
              width: 80px;
              height: 60px;
            }
          </style>
        </head>
        <body>
          <section style="justify-content: space-between ">
            <h1>TechStore</h1>
            <img src="https://img.icons8.com/external-filled-outline-icons-maxicons/344/external-tech-future-of-technology-filled-outline-icons-maxicons.png"
            alt="company icon">
          </section>
          <br>
          <span>
            <h3>${message}</h3>
          </span>
        </body>
      </html>
  
  `,
      };
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
