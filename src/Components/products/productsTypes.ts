export interface Product {
  id: number;
  title: string;
  price: number;
}

// The form's own shape — a separate type so the list page's simpler
// `Product` above never has to carry fields only the form needs.
export interface NewProductInput {
  title: string;
  price: string; // Kept as text while typing; parsed to a number only for validation/submit.
  discountPercentage: string;
  stock: string;
}

export interface FormErrors {
  title?: string;
  price?: string;
  discountPercentage?: string;
  stock?: string;
}
