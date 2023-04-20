var db = require("../db");

module.exports.requireAuth = function (req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }

  var user = db.get("users").find({ id: req.signedCookies.userId }).value();

  if (!user) {
    res.redirect("auth/login");
    return;
  }

  //bien local chi ton tai, tai thoi diem request and response, ko anh huong den cac req khac
  res.locals.user = user;

  next();
};
