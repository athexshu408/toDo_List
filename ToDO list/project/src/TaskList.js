
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css'; // Import the CSS file

const TaskList = ({ tasks, deleteTask, markAsCompleted, reorderTasks }) => {
  const [filter, setFilter] = useState('all');

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    reorderTasks(result.source.index, result.destination.index);
  };

  const filterTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'incomplete':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list" direction="vertical">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="task-list-container"
          >
            <div className="filter-buttons">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
              <button
                className={filter === 'incomplete' ? 'active' : ''}
                onClick={() => setFilter('incomplete')}
              >
                Incomplete
              </button>
            </div>
            {filterTasks().map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                  >
                    <span>{task.name}</span>
                    <span>{task.dateAdded}</span>
                    <button  style={{backgroundColor:'transparent', color:'red'}} onClick={() => deleteTask(task.id)}><i class="fa-solid fa-trash"></i></button>
                    <button onClick={() => markAsCompleted(task.id)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
