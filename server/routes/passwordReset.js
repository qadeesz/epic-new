const Router = require("express").Router();
const sendMail = require("../sendMail");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

Router.get("/checkToken/:token", (req, res, next) => {
  jwt.verify(
    req.params.token,
    config.secret,
    { ignoreExpiration: false },
    (err, payload) => {
      if (err) return next(err);
      Users.findById(payload._id, (err, user) => {
        if (err) return next(err);
        if (!user) {
          res.setHeader("content-type", "application/json");
          res.statusCode = 404;
          res.json({ message: "User not found", success: false });
          return;
        }
        res.setHeader("content-type", "application/json");
        res.statusCode = 200;
        res.json({ message: "Token verified", success: true });
      });
    }
  );
});

Router.post("/sendLink", (req, res, next) => {
  Users.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.setHeader("content-type", "application/json");
      res.statusCode = 404;
      res.json({ message: "User not found", success: false });
      return;
    }
    const passwordResetToken = jwt.sign({ _id: user._id }, config.secret, {
      expiresIn: 900
    });
    const emailBody = `<div>
    <h2>Click Link the link to reset the password</h2>
    <a href="https://epicwoo-client.firebaseapp.com/resetPassword/${passwordResetToken}">Reset Password</a>
</div>`;
    sendMail(req.body.email, "Password Reset", emailBody, res, next);
  });
});

Router.post("/setPassword", (req, res, next) => {
  jwt.verify(
    req.body.token,
    config.secret,
    { ignoreExpiration: false },
    (err, payload) => {
      if (err) return next(err);
      Users.findById(payload._id, (err, user) => {
        if (err) return next(err);
        if (!user) {
          res.setHeader("content-type", "application/json");
          res.statusCode = 404;
          res.json({ message: "User not found", success: false });
          return;
        }
        user.setPassword(req.body.password, (err, result) => {
          if (err) return next(err);
          user.save(err => {
            if (err) return next(err);
            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.json({ success: true, password: "Password reset done!" });
          });
        });
      });
    }
  );
});

module.exports = Router;
