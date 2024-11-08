const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const userId = req.user.id;


  try {
    const task = new Task({
      title,
      description,
      completed,
      userId
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasksByUser = async (req, res) => {
  const userId = req.user.id; 

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const task = await Task.findOne({ _id: id, userId });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      res.status(500).json({ error: 'Failed to get task' });
    }
  };

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.user.id;

  try {
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId.toString() !== userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  try {
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId.toString() !== userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
