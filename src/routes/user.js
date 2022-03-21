const router = require("express").Router();
const jwt = require("jsonwebtoken");
const createUser = require("../controllers/user/createUser.js");
const authLogin = require("../controllers/user/authLogin.js");
const { Token } = require("../database.js");
const generateAccessToken = require("../controllers/user/utils/generateAccessToken.js");
const verifyEmail = require("../controllers/user/utils/verifyEmail.js");

router.post("", async function (req, res) {
  const {
    firstName,
    lastName,
    password,
    profilePicture,
    email,
    rol,
    newsletterSubscription,
    direction,
  } = req.query;
  try {
    createUser(
      firstName,
      lastName,
      password,
      profilePicture,
      email,
      rol,
      newsletterSubscription,
      direction
    );

    return res.status(201).send({ msg: "User created" });
  } catch (err) {
    return res.status(500);
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const authResponse = await authLogin(email, password);
  res.send(authResponse);
});

router.post("/email", async function (req, res) {
  const { email } = req.body;
  const msg = await verifyEmail(email);
  res.send(msg);
});

router.post("/token", async function (req, res) {
  const token = req.body.token;
  try {
    if (token == null) return res.sendStatus(401);
    const storedRefreshToken = await Token.findOne({
      where: {
        token: token,
      },
    });
    if (!storedRefreshToken) return res.sendStatus(403);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const newToken = generateAccessToken(user.user);
      return res.send({ msg: "new token created", token: newToken });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
