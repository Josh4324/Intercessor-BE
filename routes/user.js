const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

router.patch("/", token.verifyToken, userController.updateUser);

router.get("/", token.verifyToken, userController.getUserDetails);

router.patch(
  "/image",
  token.verifyToken,
  upload.single("image"),
  userController.imageUpload
);

router.post("/verify", userController.verifyEmail);

router.post("/reset", userController.reset);

router.post("/forgot", userController.forgotPassword);

router.post("/confirm", userController.confirmOTP);

router.post("/password", token.verifyToken, userController.resetPassword);

module.exports = router;
