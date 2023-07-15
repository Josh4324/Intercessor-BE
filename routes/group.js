const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/group':
 *  post:
 *     tags:
 *     - Group
 *     summary: Create Group
 *     requestBody:
 *        content:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                  default: Desc
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
router.post("/", token.verifyToken, groupController.createGroup);

router.post("/add/:id", token.verifyToken, groupController.addMemberToGroup);

router.post(
  "/remove/:id",
  token.verifyToken,
  groupController.removeMemberFromGroup
);

router.get("/", token.verifyToken, groupController.getAllGroup);

router.patch("/:id", token.verifyToken, groupController.updateGroup);

router.get("/:id", token.verifyToken, groupController.getOneGroup);

module.exports = router;
