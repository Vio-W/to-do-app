import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: { id: number; name: string; price: number } }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return state.filter((item) => item.id !== action.payload.id);
      }
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }

    default:
      return ((_exhaustive: never) => state)(action);
  }
}

interface CartContextValue {
  cart: CartItem[];
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [persistedCart, setPersistedCart] = useLocalStorage<CartItem[]>(
    "cart",
    []
  );
  const [cart, dispatch] = useReducer(cartReducer, persistedCart);

  useEffect(() => {
    setPersistedCart(cart);
  }, [cart, setPersistedCart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}