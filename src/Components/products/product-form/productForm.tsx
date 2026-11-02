import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../productsApi";
import { FormErrors, NewProductInput } from "../productsTypes";
import { validateProduct } from "./productForm.validation";

// One useState per field would mean four setters plus four places that could
// drift out of sync. useReducer keeps all of them as one object, updated by
// one action shape ("change this field to this value") — see 2.16/2.20-style
// notes on grouping related state instead of scattering useState calls.
type FormAction = { type: "change"; field: keyof NewProductInput; value: string };

const initialForm: NewProductInput = { title: "", price: "", discountPercentage: "", stock: "" };

function formReducer(state: NewProductInput, action: FormAction): NewProductInput {
  return { ...state, [action.field]: action.value };
}

export default function ProductForm() {
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [savedId, setSavedId] = useState<number | null>(null);
  const navigate = useNavigate();

  function handleChange(field: keyof NewProductInput) {
    return (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "change", field, value: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validation runs before the API call — no network request for data we
    // already know is invalid.
    const nextErrors = validateProduct(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    const controller = new AbortController();
    try {
      const created = await addProduct(form, controller.signal);
      setSavedId(created.id);
    } catch {
      setSubmitError("Could not save the product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (savedId !== null) {
    return (
      <section className="space-y-3">
        <p role="status">Product saved with id {savedId}.</p>
        <button className="border rounded px-3 py-1" onClick={() => navigate("..")}>Back to list</button>
      </section>
    );
  }

  return (
    <form className="space-y-4 max-w-sm" onSubmit={handleSubmit} noValidate>
      <h1 className="text-2xl font-semibold">Add a product</h1>

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" className="border rounded p-2 w-full text-gray-900" value={form.title} onChange={handleChange("title")} />
        {errors.title && <p role="alert" className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input id="price" className="border rounded p-2 w-full text-gray-900" value={form.price} onChange={handleChange("price")} />
        {errors.price && <p role="alert" className="text-red-600 text-sm">{errors.price}</p>}
      </div>

      <div>
        <label htmlFor="discountPercentage">Discount % (optional)</label>
        <input id="discountPercentage" className="border rounded p-2 w-full text-gray-900" value={form.discountPercentage} onChange={handleChange("discountPercentage")} />
        {errors.discountPercentage && <p role="alert" className="text-red-600 text-sm">{errors.discountPercentage}</p>}
      </div>

      <div>
        <label htmlFor="stock">Stock</label>
        <input id="stock" className="border rounded p-2 w-full text-gray-900" value={form.stock} onChange={handleChange("stock")} />
        {errors.stock && <p role="alert" className="text-red-600 text-sm">{errors.stock}</p>}
      </div>

      {submitError && <p role="alert" className="text-red-600 text-sm">{submitError}</p>}
      <button className="border rounded px-3 py-1" type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Save product"}
      </button>
    </form>
  );
}
