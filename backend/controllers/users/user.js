const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const JWT_SECRET = config.get("JWT_SECRET");

const defaultErrorMsg = (err) => {
  return {
    msg: err.message || "Something went wrong!",
  };
};

/**
 * { userId } = req.params
 */
const getUserInfo = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await User.findById(userId);
    const user = _.pick(result, [
      "_id",
      "email",
      "name",
      "contact_no",
      "profilePhoto",
    ]);
    if (result) return res.status(200).send(user);
    else throw Error("User doesn't exist");
  } catch (err) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const result = await User.findById(req.user._id, { password: 0 });
    if (result) return res.status(200).send(result);
    else throw Error("This user doesn't exist anymore");
  } catch (err) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

const createNewUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ msg: "User already exists" });

    user = new User(
      _.pick(req.body, ["email", "password", "name", "contact_no"])
    );

    if (req.file) {
      const imagefile = req.file;
      const profilePhoto = {
        path: imagefile.path,
        fileName: imagefile.filename,
      };
      user.profilePhoto = profilePhoto;
    } else {
      user.profilePhoto = {
        path: null,
        fileName: null,
      };
    }
    console.log(user);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.getJWT();
    const result = await user.save();

    res.status(200).send({
      token: token,
      user: _.pick(result, [
        "_id",
        "email",
        "name",
        "contact_no",
        "profilePhoto",
      ]),
    });
  } catch (err) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

const authUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email)
      return res.status(400).send({ msg: "No email found in request body" });
    if (!password)
      return res.status(400).send({ msg: "No password found in request body" });

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send({ msg: "Email doesn't exist" });

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) return res.status(400).send({ msg: "Password is wrong!" });

    const token = user.getJWT();
    return res.status(200).send({
      token: token,
      user: _.pick(user, [
        "_id",
        "email",
        "name",
        "contact_no",
        "profilePhoto",
      ]),
    });
  } catch (err) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

const tokenValidation = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    const user = await User.findById(decoded._id);
    const ret = _.pick(user, [
      "_id",
      "name",
      "email",
      "contact_no",
      "profilePhoto",
    ]);
    return res.status(200).send(ret);
  } catch (err) {
    return res.status(400).send({ msg: "Not a valid token!" });
  }
};

module.exports = {
  tokenValidation,
  authUser,
  createNewUser,
  getUserInfo,
  getCurrentUser,
};
