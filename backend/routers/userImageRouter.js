const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs-extra");
const multer = require("multer");
const { User } = require("../models/users");

const imageStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dest = `public/images/users/${req.user._id}`;
    try {
      await fs.ensureDir(dest);
      cb(null, dest);
    } catch (e) {
      cb("Could not save", null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: imageStorage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: (_, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    )
      cb(null, true);
    else cb("Filetype not supported", false);
  },
});

const getProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.profilePhoto) res.send(user.profilePhoto);
    else return res.status(400).send("No profile photo!");
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    const dir = `public/images/users/${req.user._id}`;
    await fs.emptyDir(dir);
    upload.single("profilePhoto")(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err);
      }
      const user = await User.findByIdAndUpdate(req.user._id, {
        profilePhoto: {
          path: req.file.path,
          fileName: req.file.filename,
          fileNameWithoutExt: path.parse(req.file.path).names,
        },
      });
      res.send(req.file);
    });
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};

const deleteProfilePhoto = async (req, res) => {
  try {
    const dir = `public/images/users/${req.user._id}`;
    await fs.emptyDir(dir);
    await User.findByIdAndUpdate(req.user._id, {
      profilePhoto: null,
    });
    res.send("Deletetion successful");
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
};
router
  .route("/")
  .get(getProfilePhoto)
  .delete(deleteProfilePhoto)
  .put(updateProfilePhoto);

module.exports = router;
