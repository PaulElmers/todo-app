import React from "react";

function TodoList({ todos, deleteTodo, startEditTodo }) {
  return (
    <ul>
      {todos
        .sort((a, b) => {
          const priorities = { Low: 1, Medium: 2, High: 3 };
          return priorities[b.priority] - priorities[a.priority];
        })
        .map((todo) => (
          <li key={todo.id}>
            <div>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <p>Due: {todo.dueDate}</p>
              <p>Tags: {todo.tags}</p>
              <p className={`todo-priority ${todo.priority}`}>{todo.priority}</p>
            </div>
            <button className="edit-btn" onClick={() => startEditTodo(todo)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
    </ul>
  );
}

export default TodoList;
