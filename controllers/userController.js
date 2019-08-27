const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("./../config");

const User = require("../models/User");

// process.env.SECRET_KEY = "secret";

const createUser = (req, res, next) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + " registered!" });
            })
            .catch(err => {
              next({
                message: "Error creating user!",
                status: 401
              });
            });
        });
      } else {
        next({ message: "User already exists", status: 409 });
        // res.status(409).json({ error: "User already exists" });
      }
    })
    .catch(err => {
      next({
        message: "Enter all fields",
        status: 400
      });
    });
};

const findUser = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, config.jwtSecret, {
            expiresIn: "30d"
          });
          res.send(token);
        } else {
          // res.status(401).send("Incorrect username or password");
          next({
            message: "Incorrect password",
            status: 401
          });
        }
      } else {
        // res.status(400).json({ error: "User does not exist" });
        next({
          message: "User does not exist",
          status: 404
        });
      }
    })
    .catch(err => {
      // res.status(400).json({ error: err });
      next({
        message: "Please enter email",
        status: 400
      });
    });
};

const profile = (req, res) => {
  User.findOne({
    where: {
      email: req.user.email
    }
  }).then(user => {
    res.json(user.first_name + " " + user.last_name);
  });
};

module.exports = { createUser, findUser, profile };
