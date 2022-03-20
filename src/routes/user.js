const router = require("express").Router();
const jwt = require("jsonwebtoken");
const createUser = require("../controllers/user/createUser.js");
const authLogin = require("../controllers/user/authLogin.js");

//create Users
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

module.exports = router;
