import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchDemoPage() {
  const [raw, setRaw] = useState("");
  const debounced = useDebounce(raw, 500);

  return (
    <section>
      <h1>Search (debounce demo)</h1>
      <input
        type="text"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder="Type to compare raw vs. debounced..."
        aria-label="Search"
      />

      <div className="debounce-compare">
        <div>
          <strong>Raw value</strong>
          <p>{raw || "(empty)"}</p>
        </div>
        <div>
          <strong>Debounced (500ms)</strong>
          <p>{debounced || "(empty)"}</p>
        </div>
      </div>
    </section>
  );
}