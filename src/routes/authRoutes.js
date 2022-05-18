/**
 * User routes / Auth
 * host + /api/auth
 */

const { Router } = require("express");
// const Router = express.Router;
const { check } = require("express-validator");
const { validateFields } = require("../middleware/field-validators");
const { jwtValidation } = require("../middleware/jwt-validators");
const {
  createUser,
  userLogin,
  validateToken,
} = require("../controllers/authController");

const router = Router();

// router.get("/", (req, res) => {
//     res.json({
//         ok: true,
//         response: "Success"
//     });
// });

router.post(
  "/create",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password must be 6 or more chars").isLength({ min: 5 }),
    validateFields,
  ],
  createUser
);

router.get(
  "/",
  [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password must be 6 or more chars").isLength({ min: 5 }),
    validateFields,
  ],
  userLogin
);

router.get("/renew", jwtValidation, validateToken);

module.exports = router;
