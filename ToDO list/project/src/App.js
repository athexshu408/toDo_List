
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
   
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const markAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const reorderTasks = (oldIndex, newIndex) => {
   
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.splice(oldIndex, 1)[0];
    updatedTasks.splice(newIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <AddTaskForm addTask={addTask} reorderTasks={reorderTasks} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        markAsCompleted={markAsCompleted}
        reorderTasks={reorderTasks} 
      />
    </div>
  );
}

export default App;
