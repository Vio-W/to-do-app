import { useState, FormEvent } from "react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Todo text is required");
      return;
    }

    onAdd(trimmed);
    setText("");
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <label htmlFor="new-todo-input">New todo</label>
      <input
        id="new-todo-input"
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError(null);
        }}
        placeholder="What needs doing?"
      />
      <button type="submit">Add</button>
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
    </form>
  );
}