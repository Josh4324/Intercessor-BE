const express = require("express");
const router = express.Router();
const prayerController = require("../controllers/prayer");
const validation = require("../middlewares/validation");
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/prayer':
 *  post:
 *     tags:
 *     - Prayer
 *     summary: Create Prayer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - body
 *            properties:
 *              title:
 *                type: string
 *                default: name
 *              body:
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
router.post("/", token.verifyToken, prayerController.createPrayer);

/**
 * @openapi
 * '/api/v1/prayer':
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
 *         name: title
 *         schema:
 *           type: string
 *         description: title
 *     tags:
 *     - Prayer
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
router.get("/", token.verifyToken, prayerController.getAllPrayer);

/**
 * @openapi
 * '/api/v1/prayer/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Group Id
 *     tags:
 *     - Prayer
 *     summary: Update prayer
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - body
 *            properties:
 *              title:
 *                type: string
 *                default: name
 *              body:
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
router.patch("/:id", token.verifyToken, prayerController.updatePrayer);

module.exports = router;
