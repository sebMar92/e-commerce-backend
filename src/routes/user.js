const router = require("express").Router();
const jwt = require("jsonwebtoken");
const createUser = require("../controllers/user/createUser.js");
const authLogin = require("../controllers/user/authLogin.js");
const { Token } = require("../database.js");
const generateAccessToken = require("../controllers/user/utils/generateAccessToken.js");
const verifyEmail = require("../controllers/user/utils/verifyEmail.js");
const authToken = require("./middlewares/authToken.js");
const getUser = require("../controllers/user/getUser.js");
const editUser = require("../controllers/user/editUser.js");
const deleteUser = require("../controllers/user/deleteUser.js");
const deleteDirection = require("../controllers/direction/deleteDirection.js");

//crear nuevo usuario
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
  } = req.body;
  try {
    await createUser({
      firstName,
      lastName,
      password,
      profilePicture,
      email,
      rol,
      newsletterSubscription,
      direction,
    });

    return res.status(201).send({ msg: "User created" });
  } catch (err) {
    return res.status(500);
  }
});
//login
router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const authResponse = await authLogin(email, password);
  res.send(authResponse);
});
//verificar mail
router.post("/email", async function (req, res) {
  const { email } = req.body;
  const msg = await verifyEmail(email);
  res.send(msg);
});
//crea nuevo token
router.post("/token", async function (req, res) {
  console.log(req.user);
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

router.get("", authToken, async function (req, res) {
  const rawUser = req.user.user;
  const user = await getUser(rawUser.id);
  res.send(user);
});

router.put("", authToken, async function (req, res) {
  const user = req.user.user;
  const editedUser = await editUser(req.body, user.id);
  res.send(editedUser);
});
router.delete("", authToken, async function (req, res) {
  const user = req.user.user;
  const deletedUser = await deleteUser(user.id);
  if (deletedUser) {
    return res.send({ msg: "user deleted" });
  }
  res.send({ error: "couldn't delete user" });
});
router.delete("/direction", authToken, async function (req, res) {
  const { id } = req.body;
  const deletedDirection = await deleteDirection(id);
  if (deletedDirection) {
    return res.send({ msg: "direction deleted" });
  }
  res.send({ error: "couldn't delete direction" });
});

module.exports = router;
