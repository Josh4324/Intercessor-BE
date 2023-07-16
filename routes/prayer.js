const express = require("express");
const router = express.Router();
const prayerController = require("../controllers/prayer");
const validation = require("../middlewares/validation");
const { Token } = require("../helpers");

const token = new Token();
/**
 * @openapi
 * '/api/v1/post':
 *  post:
 *     tags:
 *     - Post
 *     summary: Create Post
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *                category:
 *                  type: string
 *                  enum: [Announcements, Devotional, Updates, Music Playlist]
 *                  default: Announcements
 *                details:
 *                  type: string
 *                  default: Post Info
 *                link:
 *                  type: string
 *                  default: johndoe@mail.com
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *     security:
 *        - bearerAuth: []
 *     description: Only an authenticated user can access this route
 */
router.post("/", token.verifyToken, prayerController.createPrayer);

router.get("/", token.verifyToken, prayerController.getAllPrayer);

router.patch("/:id", token.verifyToken, prayerController.updatePrayer);

module.exports = router;
