import { useState } from 'react';
import { createTask } from '../utils/api';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({ title: '', description: '', completed: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(taskData); 
      setTaskData({ title: '', description: '', completed: false }); 
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={taskData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={taskData.description}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="completed"
          checked={taskData.completed}
          onChange={handleChange}
        />
        Completed
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
