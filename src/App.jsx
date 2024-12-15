import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null); // Для редагування
  const [filter, setFilter] = useState("All"); // Для фільтрації
  const [searchQuery, setSearchQuery] = useState(""); // Для пошуку

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    if (selectedProject !== null) {
      const storedTodos = JSON.parse(localStorage.getItem(`todos-${selectedProject.id}`)) || [];
      setTodos(storedTodos);
    }
  }, [selectedProject]);

  const createProject = (name) => {
    const newProject = {
      id: Date.now(),
      name: name,
      todos: [],
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const addOrEditTodo = (todo) => {
    if (editTodo) {
      const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
      setTodos(updatedTodos);
      setEditTodo(null);
    } else {
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
    }
    localStorage.setItem(`todos-${selectedProject.id}`, JSON.stringify(todos));
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem(`todos-${selectedProject.id}`, JSON.stringify(updatedTodos));
  };

  const startEditTodo = (todo) => {
    setEditTodo(todo);
  };

  // Фільтрація завдань
  const filterTodos = () => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);
    const monthFromNow = new Date();
    monthFromNow.setMonth(now.getMonth() + 1);

    return todos.filter((todo) => {
      const dueDate = new Date(todo.dueDate);

      if (filter === "Today") {
        return dueDate.toISOString().slice(0, 10) === today;
      } else if (filter === "Week") {
        return dueDate <= weekFromNow;
      } else if (filter === "Month") {
        return dueDate <= monthFromNow;
      } else if (filter === "Search") {
        const query = searchQuery.toLowerCase();
        return (
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query)
        );
      } else if (filter === "Priority") {
        return todo.priority === searchQuery;
      }
      return true; // "All" case
    });
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Create a new project"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              createProject(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
      <div>
        <select onChange={(e) => setSelectedProject(projects.find((p) => p.id === Number(e.target.value)))}>
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProject && (
        <>
          <TodoForm addOrEditTodo={addOrEditTodo} editTodo={editTodo} />
          <div>
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Today">Today</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
              <option value="Search">Search</option>
              <option value="Priority">By Priority</option>
            </select>
            {filter === "Search" && (
              <input
                type="text"
                placeholder="Search by title or description"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            {filter === "Priority" && (
              <select onChange={(e) => setSearchQuery(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            )}
          </div>
          <TodoList
            todos={filterTodos()}
            deleteTodo={deleteTodo}
            startEditTodo={startEditTodo}
          />
        </>
      )}
    </div>
  );
}

export default App;
