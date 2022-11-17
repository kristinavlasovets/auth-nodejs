const User = require("./models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { username, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Email address is already registered." });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new User({
        username,
        email,
        password: hashPassword,
      });
      await user.save();
      return res.json({ message: "You have successfully registered." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async authentication(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Email address ${email} is not registered.` });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Authentication error" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }
  }

  async getUsers(req, res) {
    try {
      res.json("server works");
    } catch (e) {}
  }
}

module.exports = new authController();
