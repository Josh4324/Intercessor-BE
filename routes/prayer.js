const express = require("express");
const router = express.Router();
const prayerController = require("../controllers/prayer");
const validation = require("../middlewares/validation");
const { Token } = require("../helpers");

const token = new Token();

router.post("/", token.verifyToken, prayerController.createPrayer);

router.get("/", token.verifyToken, prayerController.getAllPrayer);

router.patch("/:id", token.verifyToken, prayerController.updatePrayer);

module.exports = router;
