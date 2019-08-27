const Todo = require("../models/todo");
const Sequelize = require("sequelize");

const getTodos = function(req, res, next) {
  if (req.query.sort) {
    const sort = req.query.sort; //// e.g. localhost:3000/api/todos?sort=id

    var field = sort;
    var order = "ASC";
    if (sort.charAt(0) === "-") {
      (order = "DESC"), (field = sort.substring(1));
    }
  } else {
    field = "created_at";
    order = "DESC";
  }

  let query = {};
  if (req.query.completed !== undefined) {
    query.completed = JSON.parse(req.query.completed);
  }

  // var whereCondition = {};
  // if (!completed) {
  //   whereCondition.user_id = req.user.id;
  // } else {
  //   whereCondition.user_id = req.user.id;
  //   whereCondition.completed = completed;
  // }

  // req.user.id;
  Todo.findAll({
    where: { user_id: req.user.id, ...query },
    order: [[field, order]]
  })
    .then(todos => {
      todos.map(todo => {
        todo.created_at = String(todo.created_at).substr(0, 15);
      });
      res.json(todos);
    })
    .catch(err => {
      next(err);
    });
};

const getTodo = function(req, res, next) {
  Todo.findOne({
    where: { user_id: req.user.id, id: req.params.id }
  })
    .then(todo => {
      res.send(todo);
    })
    .catch(err => {
      next(err);
    });
};

const postTodos = function(req, res, next) {
  if (!req.body.title) {
    next({
      message: "No title given",
      status: 400
    });
  } else {
    Todo.create({
      user_id: req.user.id,
      title: req.body.title,
      completed: false
    })
      .then(data => {
        Todo.findAll({
          where: { id: data.id }
        }).then(todos => {
          todos.map(todo => {
            todo.created_at = String(todo.created_at).substr(0, 15);
          });

          res.send(todos);
        });
        // res.send(data);
      })
      .catch(() => {
        next({
          message: "Error creating new todo",
          status: 400
        });
      });
  }
};

const deleteTodos = function(req, res, next) {
  Todo.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json({ status: "Task Deleted!" });
    })
    .catch(() => {
      next({
        message: "Error deleting todo",
        status: 400
      });
    });
};

const markTodos = function(req, res, next) {
  Todo.update(
    { completed: Sequelize.literal("NOT completed") },
    { where: { id: req.params.id } }
  )
    .then(() => {
      res.json({ status: "Changed completed status" });
    })
    .catch(err => {
      next({ message: "Error changing completed status" });
    });
};

const editTodos = function(req, res, next) {
  if (!req.body.title) {
    res.status(400);
    res.json({
      error: "Enter title"
    });
  } else {
    Todo.update(
      { title: req.body.title, completed: req.body.completed },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.json({ status: "Todo updated" });
      })
      .catch(err => {
        next({ message: "Error editing todo" });
      });
  }
};

module.exports = {
  getTodos,
  getTodo,
  postTodos,
  deleteTodos,
  markTodos,
  editTodos
};
