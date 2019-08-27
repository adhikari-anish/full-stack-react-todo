var express = require("express");
var router = express.Router();
const authenticate = require("./../middlewares/authenticate");

const todo = require("./../controllers/todoContoller");

router.get("/todos", authenticate, todo.getTodos);

router.get("/todo/:id", authenticate, todo.getTodo);

router.post("/todo", authenticate, todo.postTodos);

router.delete("/todo/:id", todo.deleteTodos);

router.put("/marktodo/:id", todo.markTodos);

router.put("/todo/:id", todo.editTodos);

module.exports = router;
