import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    signIn(trimmed);
    setEmail("");
  }

  return (
    <nav className="nav">
      <div className="nav-links">
        <NavLink to="/todos" className={({ isActive }) => (isActive ? "active" : "")}>
          Todos
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
          Users
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => (isActive ? "active" : "")}>
          Shop
        </NavLink>
        <NavLink to="/checkout" className={({ isActive }) => (isActive ? "active" : "")}>
          Checkout
        </NavLink>
      </div>

      <div className="nav-auth">
        {user ? (
          <>
            <span>Hi, {user.email}</span>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </>
        ) : (
          <form onSubmit={handleSignIn} className="signin-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email to sign in"
            />
            <button type="submit">Sign in</button>
          </form>
        )}
      </div>
    </nav>
  );
}