const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

router.post(
  "/",
  token.verifyToken,
  auth.authorization("admin"),
  upload.single("image"),
  postController.createPost
);

router.get("/", token.verifyToken, postController.getAllPost);

router.patch(
  "/:id",
  token.verifyToken,
  auth.authorization("admin"),
  postController.updatePost
);

router.patch(
  "/image/:id",
  token.verifyToken,
  auth.authorization("admin"),
  upload.single("image"),
  postController.updatePostImage
);

router.get("/:id", token.verifyToken, postController.getOnePost);

module.exports = router;
