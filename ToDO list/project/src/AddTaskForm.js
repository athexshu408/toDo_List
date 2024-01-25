
import React, { useState } from 'react';
import './AddTaskForm.css';

const AddTaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== '') {
      const newTask = {
        id: new Date().getTime(),
        name: taskName,
        dateAdded: new Date().toLocaleString(),
        completed: false,
      };
      addTask(newTask);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTaskForm;
