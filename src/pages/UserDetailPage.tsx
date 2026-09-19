import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { User } from "../types";

type Status = "loading" | "error" | "success";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // The effect depends on `id` — navigating from /users/1 to /users/2
  // must re-run the fetch, so `id` has to be in the dependency array.
  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data: User = await res.json();

        if (cancelled) return;
        if (!data || !data.id) {
          setStatus("error");
          setError("User not found");
          return;
        }
        setUser(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus("error");
      }
    }

    loadUser();

    // Cleanup: cancels this specific fetch's ability to update state
    // once `id` changes again (or the page unmounts), so a slow
    // response for the OLD id can't clobber the NEW id's data.
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <section>
        <Link to="/users">← Back to directory</Link>
        <div className="skeleton-row" style={{ marginTop: "1rem" }} />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section>
        <Link to="/users">← Back to directory</Link>
        <p className="error-message">Couldn't load user: {error}</p>
      </section>
    );
  }

  if (!user) {
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
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>
      <p>City: {user.address.city}</p>
    </section>
  );
}
