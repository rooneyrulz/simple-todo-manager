const asyncHandler = require("express-async-handler");
const Todo = require("../models/Todo");

const createTodo = asyncHandler(async (req, res, next) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add the title!");
  }

  const todo = await Todo.create({
    title: req.body.title,
    expires: req.body.expires,
  });
  return res.status(201).json(todo);
});

const getTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find();
  return res.status(200).json(todos);
});

const updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found!");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async(req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found!");
  }

  await todo.remove();
  return res.status(200).json({ id: req.params.id });
});

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
