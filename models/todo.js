const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "table_todos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: Sequelize.INTEGER
    },

    title: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN
    },
    created_at: {
      type: "TIMESTAMP"
      // defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    }
  },
  {
    timestamps: false
  }
);
