const express = require("express");
const router = express.Router();
const { Post } = require("../models/posts");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");

const imageStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dest = `public/images/posts/${req.post._id}`;
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

const saveMultiplePhotos = async (req, res) => {
  try {
    const dir = `public/images/posts/${req.post._id}`;
    let maxCanUpload = 5;
    if (await fs.pathExists(dir)) {
      const files = await fs.readdir(dir);
      maxCanUpload -= files.length;
    }
    console.log(maxCanUpload);
    upload.array("photos", maxCanUpload)(req, res, async (err) => {
      if (err) {
        err.message = "Probably max limit of photos for each post has reached";
        return res.status(403).send(err);
      } else {
        // console.log(req.files);
        const paths = [];
        req.files.forEach((val) =>
          paths.push({
            path: val.path,
            fileName: val.filename,
            fileNameWithoutExt: path.parse(val.path).name,
          })
        );
        const ret = await Post.findByIdAndUpdate(req.post._id, {
          $push: { photos: { $each: paths, $slice: 5 } },
        });
        res.send(paths);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong!");
  }
};

const unlinkFiles = async (paths) => {
  const errors = [];
  paths.forEach(async (path) => {
    try {
      await fs.unlink(path);
    } catch (err) {
      console.log(err);
      errors.push(err);
    }
  });
  return errors;
};

const deleteMultiplePhotos = async (req, res) => {
  const paths = req.body;
  try {
    const errors = await unlinkFiles(paths);
    if (errors.length > 0) return res.status(400).send(errors);
    else {
      const ret = await Post.findByIdAndUpdate(
        req.post._id,
        {
          $pull: { photos: { path: { $in: paths } } },
        },
        { new: true }
      );

      res.send(ret.photos);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Somthing went wrong!");
  }
};

const deleteOnePhoto = async (req, res) => {
  try {
    const ret = await Post.findByIdAndUpdate(req.post._id, {
      $pull: { photos: { fileName: req.params.imageName } },
    });
    const path = `public/images/posts/${req.post._id}/${req.params.imageName}`;
    await fs.unlink(path);
    res.send(`Deleted photo from database: ${req.params.imageName}`);
  } catch (e) {
    return res
      .status(400)
      .send(
        "Something went wrong! Make sure you have given valid fileName with extension(.jpg /.png /.jpeg) included!"
      );
  }
};

const getOnePhoto = async (req, res) => {
  try {
    const photo = req.post.photos.find(
      (val) => val.fileName == req.params.imageName
    );
    if (photo) res.send(photo);
    else res.status(400).send("Photo doesn't exist");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Something went wrong!");
  }
};

const getAllPhotos = async (req, res) => {
  const photos = req.post.photos;
  res.send(photos);
};

router
  .route("/")
  .get(getAllPhotos)
  .post(saveMultiplePhotos)
  .put(deleteMultiplePhotos);
router.route("/:imageName").get(getOnePhoto).delete(deleteOnePhoto);

module.exports = router;
