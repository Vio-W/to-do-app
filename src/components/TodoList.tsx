import type { Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// Pure rendering + callbacks up. No state of its own beyond what
// React needs for the list keys.
export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty">Nothing here — add a todo above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span>{todo.text}</span>
          </label>
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete "${todo.text}"`}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
