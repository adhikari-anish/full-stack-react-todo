const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("todos", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully...");
  })
  .catch(err => {
    console.log("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
