import React, { useState, useEffect } from "react";

function TodoForm({ addOrEditTodo, editTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("Low");

  // Заповнюємо форму при отриманні завдання для редагування
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
      setDueDate(editTodo.dueDate);
      setTags(editTodo.tags);
      setPriority(editTodo.priority);
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !tags) return;

    const todo = {
      id: editTodo ? editTodo.id : Date.now(), // Якщо редагуємо, залишаємо старий ID
      title,
      description,
      dueDate,
      tags,
      priority,
    };

    addOrEditTodo(todo);

    // Очищаємо форму
    setTitle("");
    setDescription("");
    setDueDate("");
    setTags("");
    setPriority("Low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">{editTodo ? "Save Changes" : "Add Todo"}</button>
    </form>
  );
}

export default TodoForm;
