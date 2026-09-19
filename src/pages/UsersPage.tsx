import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types";

type Status = "loading" | "error" | "success";

export default function UsersPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setStatus("loading");
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data: User[] = await res.json();

        // Guard: if the component unmounted (or this effect re-ran)
        // before the fetch resolved, don't touch state — an older,
        // in-flight request must never overwrite a newer result.
        if (cancelled) return;
        setUsers(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus("error");
      }
    }

    loadUsers();

    // Cleanup: flips the flag so a response that arrives after
    // unmount/re-fetch is silently discarded instead of causing a
    // "state update on unmounted component" warning or a stale overwrite.
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <section>
        <h1>User Directory</h1>
        <ul className="user-list skeleton">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="skeleton-row" />
          ))}
        </ul>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section>
        <h1>User Directory</h1>
        <p className="error-message">Couldn't load users: {error}</p>
      </section>
    );
  }

  if (users.length === 0) {
    return (
      <section>
        <h1>User Directory</h1>
        <p className="empty">No users found.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>User Directory</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <span className="user-meta"> — {user.company.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
