const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

router.post("/", token.verifyToken, groupController.createGroup);

router.post("/add/:id", token.verifyToken, groupController.addMemberToGroup);

router.get("/", token.verifyToken, groupController.getAllGroup);

router.patch("/:id", token.verifyToken, groupController.updateGroup);

module.exports = router;