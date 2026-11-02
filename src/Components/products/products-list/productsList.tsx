import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProduct } from "../productsApi";
import { useProductCurrency } from "../productsContext";
import { Product } from "../productsTypes";

export default function ProductsList() {
  // useState remembers quantity; its setter requests a render after a button click.
  const [quantity, setQuantity] = useState(1);
  // useState holds the API result and request status between renders.
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // This custom Hook uses useContext to read the module's shared currency.
  const currency = useProductCurrency();
  // useRef keeps the input element so a button can focus it without changing state.
  const noteInput = useRef<HTMLInputElement>(null);

  // useEffect starts the request after mount; [] means typing and quantity changes do not restart it.
  useEffect(() => {
    const controller = new AbortController();
    async function loadProduct() {
      try {
        const result = await getProduct(controller.signal);
        // The response arrived: save it so the next render can display its fields.
        if (!controller.signal.aborted) setProduct(result);
      } catch {
        if (!controller.signal.aborted) setError("Could not load the product. Reload to try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProduct();
    // Cleanup aborts the request when this page unmounts (or the Effect restarts).
    return () => controller.abort();
  }, []);

  // A simple total is derived during rendering; it needs no extra state or Effect.
  const total = product ? product.price * quantity : 0;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Products — Hooks practice</h1>
      {loading && <p role="status">Loading product…</p>}
      {error && <p role="alert">{error}</p>}
      {product && (
        <div className="space-y-3 rounded border p-4">
          {/* JSX reads API state; React DOM updates these values when the response arrives. */}
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p>Unit price: {currency} {product.price.toFixed(2)}</p>
          <p>Quantity: {quantity}</p>
          {/* Event handlers call the setter returned by useState, not the Hook itself. */}
          <button className="border rounded px-3 py-1" onClick={() => setQuantity(q => q + 1)}>Add one</button>
          <p>Total: {currency} {total.toFixed(2)}</p>
        </div>
      )}
      <div className="space-x-3">
        <label htmlFor="product-note">Product note</label>
        <input id="product-note" ref={noteInput} className="border rounded p-2 text-gray-900" />
        {/* The ref points to the real input; focus() does not request a React render. */}
        <button className="border rounded px-3 py-1" onClick={() => noteInput.current?.focus()}>Focus note</button>
      </div>
      <Link className="underline" to="new">Open product form</Link>
    </section>
  );
}
