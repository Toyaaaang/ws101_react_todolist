import React, { useState } from 'react';
import './ToDoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(''); 
  const [editingIndex, setEditingIndex] = useState(null);

  const handleTaskChange = () => {
    if (editingIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? { ...todo, task, date } : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      if (task.trim() && date) {
        setTodos([...todos, { task, date, completed: false }]);
      }
    }
    setTask('');
    setDate(''); 
  };

  const handleToggleComplete = (index) => {
    const newTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleEditTask = (index) => {
    setTask(todos[index].task);
    setDate(todos[index].date); 
    setEditingIndex(index);
  };

  const handleRemoveTask = (index) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <input
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleTaskChange}>
          {editingIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span onClick={() => handleEditTask(index)} style={{ cursor: 'pointer' }}>
              {todo.task} (Due on: {todo.date}) {}
            </span>
            <button onClick={() => handleRemoveTask(index)} className="remove-button">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
