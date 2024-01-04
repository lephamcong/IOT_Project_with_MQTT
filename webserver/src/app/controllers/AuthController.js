const Turbine = require("../models/Turbine");
const Data = require("../models/Data");
const Maintenance = require("../models/Maintenance");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateEmailToken } = require("../../util/jwt");
const { sendMail } = require("../../util/mailer");

const {
  multipleMongooseToObject,
  singleMongooseToObject,
} = require("../../util/mongoose");
class AuthController {
  //[GET] /auth/login
  async loginPage(req, res) {
    res.render("pages/login");
  }
  //[POST] /auth/login
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
        const currentUser = user.username;
        res.render("pages/about", { currentUser: currentUser });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //[GET] auth/register
  async registerPage(req, res) {
    res.render("pages/register");
  }
  //[POST] auth/register
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
  //[GET] /auth/forgotpassword
  async forgotPasswordPage(req, res) {
    res.render("pages/forgotPassword");
  }
  //[POST] /auth/forgotpassword
  async forgotPassword(req, res) {
    const emailToken = generateEmailToken(req.body.email);
    sendMail(
      req.body.email,
      "Forgot Password",
      `<a href="${process.env.APP_URL}/auth/resetpassword?email=${req.body.email}&token=${emailToken}"> Verify your email and reset your password </a>`
    );
    res.render("pages/forgotPassword", {
      msgSuccess: "Success! Check your email within 1 minute",
    });
  }
  //[GET] /auth/resetpassword
  async resetPasswordPage(req, res) {
    const token = req.query.token;
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, result) => {
        if (err)
          return res.render("pages/forgotPassword", {
            msgErr: "Your session has expired! Resend Email",
          });
        else {
          if (result.email !== req.query.email)
            return res.render("pages/forgotPassword", {
              msgErr: "Email is incorrect! Give it back please",
            });
          else res.render("pages/resetPassword");
        }
      });
    } else {
      return res.render("pages/forgotPassword", {
        msgErr: "You are accessing illegally",
      });
    }
  }
  //[POST] /auth/resetpassword
  async resetPassword(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //update password
      const user = await User.findOneAndUpdate(
        { email: req.body.email },
        { password: hashed }
      );
      if (!user)
        return res.render("pages/resetPassword", {
          msgErr: "Email not found",
        });
      res.render("pages/login", {
        msgSuccess: "Password changed successfully !",
      });
    } catch (error) {}
  }

  //[GET] /auth/logout
  async logout(req, res) {
    try {
      res.clearCookie("accessToken");
      res.redirect("/auth/login");
    } catch (error) {}
  }
}
module.exports = new AuthController();
