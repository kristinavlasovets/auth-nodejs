const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Username cannot be empty").notEmpty(),
    check("email", "Invalid email address. Please try again.").isEmail(),
    check("password", "Password must contain at least 1 character.").isLength({
      min: 1,
    }),
  ],
  controller.registration
);
router.post("/authentication", controller.authentication);
router.get("/users", controller.getUsers);

module.exports = router;
