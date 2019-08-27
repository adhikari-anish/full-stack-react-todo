const express = require("express");
const users = express.Router();
const cors = require("cors");
const authenticate = require("./../middlewares/authenticate");

const user = require("./../controllers/userController");

users.use(cors());

users.post("/register", user.createUser);

users.post("/login", user.findUser);
users.get("/profile", authenticate, user.profile);

// users.get("/profile", (req, res) => {
//   var decoded = jwt.verify(
//     req.headers["authorization"],
//     process.env.SECRET_KEY
//   );

//   User.findOne({
//     where: {
//       id: decoded.id
//     }
//   })
//     .then(user => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.send("User does not exist");
//       }
//     })
//     .catch(err => {
//       res.send("error: " + err);
//     });
// });

module.exports = users;
