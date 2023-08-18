module.exports = (app) => {
  var router = require("express").Router();
  const fileUpload = require("express-fileupload");
  app.use(fileUpload());
  const users = require("../controller/users.js");
  app.post("/signup", users.signup);
  app.post("/login", users.login);
  app.post("/user_info", users.user_info);
  app.post("/updateprofile", users.updateprofile);
  app.post("/changepassword", users.changepassword);
  app.post("/forgotpassword", users.forgotpassword);
};
