import { useCart } from "../context/CartContext";

const PRODUCTS = [
  { id: 1, name: "Wireless Mouse", price: 19.99 },
  { id: 2, name: "Mechanical Keyboard", price: 59.99 },
  { id: 3, name: "USB-C Hub", price: 24.5 },
  { id: 4, name: "Webcam", price: 39.0 },
];

export default function ShopPage() {
  const { cart, dispatch } = useCart();

  function quantityOf(id: number) {
    return cart.find((item) => item.id === id)?.quantity ?? 0;
  }

  return (
    <section>
      <h1>Shop</h1>
      <ul className="product-list">
        {PRODUCTS.map((product) => {
          const qty = quantityOf(product.id);
          return (
            <li key={product.id} className="product-row">
              <div>
                <strong>{product.name}</strong>
                <span className="user-meta"> — ${product.price.toFixed(2)}</span>
              </div>

              <div className="qty-controls">
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { id: product.id, quantity: qty - 1 },
                    })
                  }
                  disabled={qty === 0}
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "ADD_ITEM",
                      payload: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                      },
                    })
                  }
                  aria-label={`Add ${product.name} to cart`}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}