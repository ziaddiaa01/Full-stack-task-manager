const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
  getTaskById
} = require('../controllers/taskController');

router.post('/', protect, createTask);
router.get('/user', protect, getTasksByUser);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);
router.get('/:id', protect, getTaskById);

module.exports = router;
