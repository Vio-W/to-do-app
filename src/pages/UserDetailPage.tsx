import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (loading) {
    return (
      <section>
        <Link to="/users">← Back to directory</Link>
        <div className="skeleton-row" style={{ marginTop: "1rem" }} />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Link to="/users">← Back to directory</Link>
        <p className="error-message">Couldn't load user: {error}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section>
        <Link to="/users">← Back to directory</Link>
        <p className="empty">No data for this user.</p>
      </section>
    );
  }

  return (
    <section>
      <Link to="/users">← Back to directory</Link>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
      <p>Company: {data.company.name}</p>
      <p>City: {data.address.city}</p>
    </section>
  );
}