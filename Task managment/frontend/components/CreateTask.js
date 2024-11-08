import React, { useState } from 'react';
import { createTask } from '../utils/api';

const CreateTask = ({ onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Task data being sent:", taskData); 
    try {
      const response = await createTask(taskData);
      setSuccess(true);
      setTaskData({ title: '', description: '', completed: false });
      onTaskCreated(response.data); 
    } catch (err) {
      setError('Error creating task');
      console.error(err);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto">
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">Task created successfully!</p>}

      <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
        <div className="mb-3 w-full md:w-1/2 pr-2">
        <label className="block text-[#E6E8E6]  mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="w-full p-2  text-[#191919] rounded-md outline-none   bg-[#CED0CE] "
          />
        </div>

        <div className="mb-3 w-full md:w-1/2 pr-2">
          <label className="block text-[#E6E8E6]  mb-1">Description</label>
          <input
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-2  text-[#191919] rounded-md outline-none   bg-[#CED0CE] "
          />
        </div>

        <div className="mb-4 w-full md:w-1/2 pr-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={taskData.completed}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700 dark:text-gray-300">Mark as completed</label>
          </div>
        </div>
        <div className='w-full'>
        <button
            type="submit"
            className="rounded-md bg-[#205A39] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#2e8253] focus:shadow-none active:bg-[#2e8253] hover:bg-[#2e8253] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
            Create
          </button>
        </div>
          
      </form>
    </div>
  );
};

export default CreateTask;
