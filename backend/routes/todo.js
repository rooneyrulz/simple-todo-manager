const { Router } = require("express");
const todoController = require("../controllers/todo");

const router = Router({ strict: true });

router.route("/").get(todoController.getTodos).post(todoController.createTodo);
router
  .route("/:id")
  .put(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
