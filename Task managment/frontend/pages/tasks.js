import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../utils/api";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import CreateTask from "../components/CreateTask"; 

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };
  
  const handleToggleCreateTask = () => {
    setShowCreateTask((prev) => !prev);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowCreateTask(false);
  };

  return (
    <div className="bg-[#191919] px-[5%] py-[2%] flex flex-col min-h-screen">
      <Navbar />
      <div className="relative w-fit mx-auto mb-9">
        <span className="text-2xl md:text-3xl font-bold">Your tasks dashboard</span>
        <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#F15025] via-[#f37451] to-[#f08f74] rounded-full"></span>
      </div>
      {showCreateTask && <CreateTask onTaskCreated={handleTaskCreated} />}
      <button
        onClick={handleToggleCreateTask}
        className={`text-xl mx-auto w-fit block mt-2 transform transition duration-500 hover:scale-110 ${showCreateTask ? 'text-center' : 'text-2xl'}`}
      >
        {showCreateTask ? `Cancel` : "+ New Task"}
      </button>

      {tasks.length === 0 ? (
        <div className="text-center shadow-md h-auto text-3xl py-8 text-gray-400 mt-10">
          No tasks available. You can create one!
        </div>
      ) : (
        <TaskList tasks={tasks} onDelete={handleDelete} onTaskUpdate={handleTaskUpdate} />
      )}
      
      <div className="flex-grow"></div>
    </div>
  );
};

export default TaskPage;
