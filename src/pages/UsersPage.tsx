import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types";

export default function UsersPage() {
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
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

  if (error) {
    return (
      <section>
        <h1>User Directory</h1>
        <p className="error-message">Couldn't load users: {error}</p>
      </section>
    );
  }

  if (!data || data.length === 0) {
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
        {data.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <span className="user-meta"> — {user.company.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}