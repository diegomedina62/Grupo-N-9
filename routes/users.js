const express = require("express");
const validationMiddleware = require("../middlewares/ValidationMiddleware");
const userSchemaPOST = require("../schemas/userSchema-Post");
const userSchemaPUT = require("../schemas/userSchema-PUT");

const {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    users:
 *      type: object
 *      requires:
 *        -firstName
 *        -lastName
 *        -email
 *        -password
 *        -avatar
 *        -date
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the user
 *        firstName:
 *          type: string
 *          description: This is the firstName of the user
 *        lastName:
 *          type: string
 *          description: This is the lastName of the user
 *        email:
 *          type: string
 *          description: This is the email of the user
 *        password:
 *          type: alphanumeric
 *          description: This is the password of the user
 *        avatar:
 *          type: string
 *          description: This is the avar of the user
 *        date:
 *          type: date
 *          description: This is the date of the user
 *
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: returns the list of all the users
 *    responses:
 *      200:
 *         description: the list of the users
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/users'
 */
router.get("/", getUser);

/**
 * @swagger
 * /users/{id}:
 *    get:
 *       summary: Get the users by id
 *       tags: [users]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *            type: integer
 *           required: true
 *           description: The user id
 *       responses:
 *          200:
 *            description: The user description by id
 *            contents:
 *              application/json:
 *              schema:
 *                $ref: '#/components/schemas/users'
 *          404:
 *            description: The user was not found
 */
router.get("/:id", getUserId);

/**
 * @swagger
 * /users:
 *  post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/users'
 *     responses:
 *          200:
 *            description: The user was succesfully created
 *            contents:
 *              application/json:
 *              schema:
 *                $ref: '#/components/schemas/users'
 *          500:
 *            description: Some server
 */
router.post("/", validationMiddleware(userSchemaPOST), postUsers);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Get the users by id
 *       tags: [users]
 *    parameters:
 *        - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/users'
 *    responses:
 *          200:
 *            description: The user was updated
 *            contents:
 *              application/json:
 *              schema:
 *                $ref: '#/components/schemas/users'
 *          404:
 *            description: The user was not found
 */

router.put("/:id", validationMiddleware(userSchemaPUT), putUsers);

/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: remove the users by id
 *      tags: [users]
 *      parameters:
 *        - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *
 *    responses:
 *       200:
 *          description: The user was deleted
 *       404:
 *          description: The user was not found
 */
router.delete("/:id", deleteUser);

module.exports = router;
