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

router.get("/:id", getUserId);
router.post("/", validationMiddleware(userSchemaPOST), postUsers);
router.put("/:id", validationMiddleware(userSchemaPUT), putUsers);
router.delete("/:id", deleteUser);

module.exports = router;
