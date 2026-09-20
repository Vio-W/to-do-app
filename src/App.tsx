import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import TodosPage from "./pages/TodosPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchDemoPage from "./pages/SearchDemoPage";
import NotFound from "./pages/NotFound";
import "./styles.css";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <NavBar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Navigate to="/todos" replace />} />
              <Route path="/todos" element={<TodosPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/search" element={<SearchDemoPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}