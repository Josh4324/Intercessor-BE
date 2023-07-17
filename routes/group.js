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
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: name
 *              description:
 *                type: string
 *                default: desc
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

/**
 * @openapi
 * '/api/v1/group/add/{id}':
 *  post:
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Group Id
 *     tags:
 *     - Group
 *     summary: Add member
 *     requestBody:
 *        content:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: string
 *                  description: User Id
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
router.post("/add/:id", token.verifyToken, groupController.addMemberToGroup);

/**
 * @openapi
 * '/api/v1/group/remove/{id}':
 *  post:
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Group Id
 *     tags:
 *     - Group
 *     summary: Remove member
 *     requestBody:
 *        content:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: string
 *                  description: User Id
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
router.post(
  "/remove/:id",
  token.verifyToken,
  groupController.removeMemberFromGroup
);

/**
 * @openapi
 * '/api/v1/group':
 *  get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page Number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: No of items per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of group
 *     tags:
 *     - Group
 *     summary: Get all groups
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
router.get("/", token.verifyToken, groupController.getAllGroup);

/**
 * @openapi
 * '/api/v1/group/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Group Id
 *     tags:
 *     - Group
 *     summary: Update group
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: name
 *              description:
 *                type: string
 *                default: name
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
router.patch("/:id", token.verifyToken, groupController.updateGroup);

/**
 * @openapi
 * '/api/v1/group/{id}':
 *  get:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Series Id
 *     tags:
 *     - Group
 *     summary: Get one group
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
router.get("/:id", token.verifyToken, groupController.getOneGroup);

module.exports = router;
