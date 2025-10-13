
import React, { useState } from "react";
import "./Practical6.css";

const Practical6 = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <form onSubmit={addTask} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="todo-add">Add</button>
      </form>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(task.id)}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="todo-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Practical6;

