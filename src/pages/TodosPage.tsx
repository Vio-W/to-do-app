import { useMemo, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import FilterBar from "../components/FilterBar";
import WindowWidth from "../components/WindowWidth";
import type { Filter, Todo } from "../types";

let nextId = 1;

// TodoApp: the ONLY component that owns the todos array and the
// filter. Everything below talks through props down / callbacks up —
// AddTodo, TodoList, and FilterBar hold no shared state themselves.
export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  function handleAdd(text: string) {
    setTodos((prev) => [...prev, { id: nextId++, text, completed: false }]);
  }

  function handleToggle(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleDelete(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  return (
    <section>
      <h1>Todos</h1>
      <WindowWidth />
      <AddTodo onAdd={handleAdd} />
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={handleClearCompleted}
        completedCount={completedCount}
      />
      <TodoList
        todos={visibleTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </section>
  );
}
