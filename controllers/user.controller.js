var db = require("../db");
var shortid = require("shortid");

module.exports.index = function (req, res) {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};

module.exports.search = function (req, res) {
  var q = req.query.q;
  var matchedUsers = db
    .get("users")
    .value()
    .filter(function (user) {
      //nếu q có trong string thì giá trị trả về là >-1, còn ko có thì là -1
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

  res.render("users/index", {
    users: matchedUsers,
  });
};

module.exports.create = function (req, res) {
  res.render("users/create");
};

module.exports.get = function (req, res) {
  //id ở param
  var id = req.params.id;

  //lấy id ở trong param
  var user = db.get("users").find({ id: id }).value();

  res.render("users/view", {
    user: user,
  });
};

module.exports.postCreate = function (req, res) {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  db.get("users").push(req.body).write();
  res.redirect("/users");
};
