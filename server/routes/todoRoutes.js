const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/todos', todoController.getAllTodos);
router.post('/todos', todoController.createTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.put('/todos/:id', todoController.updateTodo);
router.post('/summarize', todoController.summarizeAndSend);

module.exports = router;