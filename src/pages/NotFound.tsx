import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>404 — Page not found</h1>
      <p>There's nothing at this URL.</p>
      <Link to="/todos">Go to Todos</Link>
    </section>
  );
}
