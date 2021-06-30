const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/users");
const authorize = require("../middlewares/authorize");
const userImageRouter = require("./userImageRouter");
const jwt = require("jsonwebtoken");
const config = require("config");
const { route } = require("./userImageRouter");
const JWT_SECRET = config.get("JWT_SECRET");

const createNewUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists");

  user = new User(
    _.pick(req.body, ["email", "password", "name", "contact_no"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.getJWT();
  const result = await user.save();

  res.send({
    token: token,
    user: _.pick(result, ["_id", "email", "name", "contact_no"]),
  });
};

const authUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) return res.status(400).send("No email found in request body");
  if (!password)
    return res.status(400).send("No password found in request body");

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Email doesn't exist");

  const pass = await bcrypt.compare(password, user.password);
  if (!pass) return res.status(400).send("Password is wrong!");

  const token = user.getJWT();
  res.send({
    token: token,
    user: _.pick(user, ["_id", "email", "name", "contact_no"]),
  });
};

const authWithToken = async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    return res.status(200).send(decoded);
  } catch (err) {
    return res.status(400).send("Not a valid token!");
  }
};

router
  .route("/")
  .get((req, res) => {
    res.send("users info can be found here");
  })
  .post((req, res) => {
    return res.status(400).send(`Use /signup or /login for authentication!`);
  });

router
  .route("/signup")
  .post(createNewUser)
  .get((r, s) => s.send("You need to POST! not GET"));
router
  .route("/login")
  .post(authUser)
  .get((r, s) => s.send("You need to POST! not GET"));

router.route("/login/token").post(authWithToken);

router.use("/profile-photo", authorize, userImageRouter);

module.exports = router;
