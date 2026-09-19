import type { Filter } from "../types";

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
  completedCount: number;
}

const FILTERS: Filter[] = ["all", "active", "completed"];

export default function FilterBar({
  filter,
  onFilterChange,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={f === filter ? "active" : ""}
            onClick={() => onFilterChange(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed ({completedCount})
      </button>
    </div>
  );
}
