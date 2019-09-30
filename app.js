var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");

var todos = require("./routes/todos");

var port = process.env.PORT || 4000;

var app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", todos);

const Users = require("./routes/Users");

app.use("/users", Users);
// localStorage.setItem("usertoken", response.data);

app.use(function(req, res, next) {
  next({
    message: "Not found",
    status: "404"
  });
});

// error handling middleware
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message || err,
    status: err.status || 500
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, err => {
  if (!err) {
    return console.log("Server started on port " + port);
  }
  console.log("Server not listening...");
});
