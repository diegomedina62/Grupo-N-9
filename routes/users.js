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
 *    Users:
 *     type: object
 *     required:
 *      - firstName:
 *      - lastName:
 *      - email:
 *      - password:
 *     properties:
 *      id:
 *        type: integer
 *        description: the auto-generated id of the book
 *      firstName:
 *        type: string
 *        description: This is the firstname of the user
 *      lastName:
 *        type: string
 *        description: This is the lastname of the user
 *      email:
 *        type: string
 *        description: This is the email of the user
 *      password:
 *        type: Alphanumeric
 *        description: This is the password of the user
 */

/**
 * @swagger
 *  /users:
 *     get:
 *        summary: Returns the list of all users
 *        responses:
 *          200:
 *            description: The list of the users
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                    items:
 *                      $ref: '#/components/schemas/users'
 */
router.get("/", getUser);
router.get("/:id", getUserId);
router.post("/", validationMiddleware(userSchemaPOST), postUsers);
router.put("/:id", validationMiddleware(userSchemaPUT), putUsers);
router.delete("/:id", deleteUser);

module.exports = router;
