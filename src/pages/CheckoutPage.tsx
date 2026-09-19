import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section>
        <h1>Checkout</h1>
        <p className="empty">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-row">
            <span>{item.name}</span>
            <div className="qty-controls">
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity - 1 },
                  })
                }
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity + 1 },
                  })
                }
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <button
              type="button"
              className="delete-btn"
              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })}
              aria-label={`Remove ${item.name}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: ${total.toFixed(2)}</p>
    </section>
  );
}