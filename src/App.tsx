import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import NotFound from "./pages/NotFound";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        {/* NavLink instead of <a> — client-side navigation, no full reloads */}
        <NavLink to="/todos" className={({ isActive }) => (isActive ? "active" : "")}>
          Todos
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
          Users
        </NavLink>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
