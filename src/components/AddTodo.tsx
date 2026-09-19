import { useState, FormEvent } from "react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

// Purely presentational + local input state.
// It never touches the todos array directly — it only calls the
// callback that TodoApp (the owner) passed down.
export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New todo text"
      />
      <button type="submit">Add</button>
    </form>
  );
}
