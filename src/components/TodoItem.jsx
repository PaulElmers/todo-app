import React from 'react';

const TodoItem = ({ todo, deleteTodo, startEditing }) => {
  return (
    <li>
      <div className="todo-text">
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p><strong>Due Date: </strong>{todo.date}</p>
        <p><strong>Tags: </strong>{todo.tags}</p>
        <span className={`todo-priority ${todo.priority}`}>{todo.priority}</span>
      </div>
      <div>
        <button className="edit-btn" onClick={() => startEditing(todo)}>Edit</button>
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
