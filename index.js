require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var userRoute = require("./routes/user.route");
var authRoute = require("./routes/auth.route");
var productRoute = require("./routes/product.route");
var cartRoute = require("./routes/cart.route");
var transferRoute = require("./routes/transfer.route");

var apiProductRoute = require("./api/routes/product.route");

var authMiddleware = require("./middlewares/auth.middlewares");
var sessionMiddleware = require("./middlewares/session.middlewares");

var port = 8000;

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static("public"));

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/transfer", authMiddleware.requireAuth, transferRoute);

//tạo api bên back-end
app.use('/api/products', apiProductRoute)

//truyền data (name)
app.get("/", function (req, res) {
  res.render("index", {
    name: "Pug",
  });
});

app.listen(port, function () {
  console.log("Server is running at: ", +port);
});
