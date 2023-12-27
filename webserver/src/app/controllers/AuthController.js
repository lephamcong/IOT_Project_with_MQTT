const Turbine = require("../models/Turbine");
const Data = require("../models/Data");
const Maintenance = require("../models/Maintenance");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../../util/jwt");

const {
  multipleMongooseToObject,
  singleMongooseToObject,
} = require("../../util/mongoose");
class AuthController {
  //[GET] /auth/login
  async loginPage(req, res) {
    res.render("pages/login");
  }
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user)
        return res.render("pages/login", {
          emailErr: "Email not found",
        });

      //check password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.render("pages/login", {
          passErr: "Password incorrect",
        });

      //username & password correct
      if (user && validPassword) {
        const accessToken = generateAccessToken(user);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          samSite: "strict",
        });
        const { password, ...other } = user._doc; // xóa password trong response
        res.redirect("/list");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async registerPage(req, res) {
    res.render("pages/register");
  }
  async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //created new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      // save newUser to DB
      const user = await newUser.save();

      res.render("pages/login", {
        msgSuccess: "Register successfully !",
      });
    } catch (error) {
      res.render("pages/register", {
        msgErr: "Username or email already exists",
      });
    }
  }
}
module.exports = new AuthController();
