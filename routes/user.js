const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/user/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - phoneNumber
 *            properties:
 *              firstName:
 *                type: string
 *                default: johndoe
 *              lastName:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              phoneNumber:
 *                type: string
 *                default: 09034523457
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/signup", userController.signUp);
/**
 * @openapi
 * '/api/v1/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/login", userController.logIn);
/**
 * @openapi
 * '/api/v1/user':
 *  patch:
 *     tags:
 *     - User
 *     summary: Update user
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - phoneNumber
 *            properties:
 *              firstName:
 *                type: string
 *                default: johndoe
 *              lastName:
 *                type: string
 *                default: johndoe
 *              phoneNumber:
 *                type: string
 *                default: 09034523457
 *     responses:
 *      200:
 *        description: Sucess
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
router.patch("/", token.verifyToken, userController.updateUser);
/**
 * @openapi
 * '/api/v1/user':
 *  get:
 *     tags:
 *     - User
 *     summary: Get user details
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
router.get("/", token.verifyToken, userController.getUserDetails);
/**
 * @openapi
 * '/api/v1/user/image':
 *  patch:
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *     tags:
 *     - User
 *     summary: Upload user image
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
router.patch(
  "/image",
  token.verifyToken,
  upload.single("image"),
  userController.imageUpload
);
/**
 * @openapi
 * '/api/v1/user/verify':
 *  post:
 *     tags:
 *     - User
 *     summary: Verify User Email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - code
 *            properties:
 *              id:
 *                type: string
 *                default: 10
 *              code:
 *                type: string
 *                default: 5fgdb
 *     responses:
 *      200:
 *        description: Verified
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/verify", userController.verifyEmail);
/**
 * @openapi
 * '/api/v1/user/reset':
 *  post:
 *     tags:
 *     - User
 *     summary: Reset Password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - confirmPassword
 *              - code
 *            properties:
 *              email:
 *                type: string
 *                default: ade@yahoo.com
 *              password:
 *                type: string
 *                default: akfjajhadh
 *              confirmPassword:
 *                type: string
 *                default: akfjajhadh
 *              code:
 *                type: string
 *                default: 43256
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/reset", userController.reset);

/**
 * @openapi
 * '/api/v1/user/forgot':
 *  post:
 *     tags:
 *     - User
 *     summary: Send Reset Password Email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: ade@yahoo.com
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/forgot", userController.forgotPassword);

router.post("/confirm", userController.confirmOTP);
/**
 * @openapi
 * '/api/v1/user/password':
 *  post:
 *     tags:
 *     - User
 *     summary: Reset User Password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *                default: akfjajhadh
 *              newPassword:
 *                type: string
 *                default: akfjajhadh
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
router.post("/password", token.verifyToken, userController.resetPassword);

module.exports = router;
