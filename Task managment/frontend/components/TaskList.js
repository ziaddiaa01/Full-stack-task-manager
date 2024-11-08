import { useState } from "react";
import { updateTask } from "../utils/api";

const TaskList = ({ tasks, onDelete, onTaskUpdate }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [filter, setFilter] = useState("all");

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditData({
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await updateTask(editingTaskId, editData);
      const updatedTask = response.data;
      onTaskUpdate(updatedTask);
      setEditingTaskId(null);
      setEditData({ title: "", description: "", completed: false });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleCompletion = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task._id, { completed: !task.completed });
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "notCompleted") return !task.completed;
    return true;
  });

  return (
    <div>
      <div className="mt-7 flex flex-wrap gap-3 justify-center items-center">
        <h2 className="text-lg font-semibold">Filter Options</h2>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === "all"
              ? "bg-[#F15025] text-white"
              : "bg-white text-[#191919] border border-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === "completed"
              ? "bg-[#F15025] text-white"
              : "bg-white text-[#191919] border border-black"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("notCompleted")}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === "notCompleted"
              ? "bg-[#F15025] text-white"
              : "bg-white text-[#191919] border border-black"
          }`}
        >
          Not Completed
        </button>
      </div>

      <ul className="bg-[#CED0CE] shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto mt-5">
        {filteredTasks.map((task) => (
          <li key={task._id} className="border-t border-gray-500">
            <div className="px-4 py-5 sm:px-6">
              {editingTaskId === task._id ? (
                <div>
                  <div className="mb-4 text-[#191919]">
                    <h1 className="mb-4 text-2xl">Edit task</h1>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-[#191919] mb-2"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300"
                      placeholder="Task Title"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-[#191919] mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      className="shadow-sm rounded-md w-full px-3 py-2 border text-[#191919] border-gray-300"
                      placeholder="Task Description"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={handleUpdate}
                      className="rounded-md bg-[#205A39] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                      type="button"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="rounded-md bg-[#780D0D] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {task.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-[#505150]">
                      {task.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <label
                      className="relative inline-flex items-center cursor-pointer"
                      onClick={() => toggleCompletion(task)}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="sr-only peer"
                        onChange={() => toggleCompletion(task)}
                      />
                      <div className="w-9 h-5 bg-[#780D0D] hover:bg-[#780D0D] peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#205A39] hover:peer-checked:bg-[#205A39]"></div>
                    </label>

                    <p
                      className={`text-sm font-medium cursor-pointer ${
                        task.completed ? "text-[#205A39]" : "text-[#780D0D]"
                      }`}
                    >
                      {task.completed ? "Completed" : "Not Completed"}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="rounded-md bg-[#205A39] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(task._id)}
                        className="rounded-md bg-[#780D0D] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
