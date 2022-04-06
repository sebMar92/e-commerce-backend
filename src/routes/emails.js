const router = require("express").Router();
var nodemailer = require("nodemailer");
require("dotenv").config();
const { PASS } = process.env;

router.post("", (req, res) => {
  try {
    const { receivers, message, title } = req.body;
  
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "techstore421@gmail.com",
        pass: PASS,
      },
    });
  
    var mailOptions = {
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
        <h1>${message}</h1>
      </body>
      </html>
    `,
    };
  
    transporter.sendMail(mailOptions, function (error, info){
      if(error){
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch(err){
    console.log(err);
  }
});

module.exports = router;