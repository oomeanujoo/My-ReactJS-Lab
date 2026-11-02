import { FormErrors, NewProductInput } from "../productsTypes";

// Kept as a plain function with no React import: it takes data in, returns
// errors out, so it can be unit-tested and reused without rendering anything.
// Field checks (required, format) and business rules (cross-field limits)
// live in the same place on purpose — both are "is this data allowed", just
// at different scopes, and a reviewer should be able to read every rule here
// without hunting through the component for a stray `if`.
export function validateProduct(input: NewProductInput): FormErrors {
  const errors: FormErrors = {};

  if (!input.title.trim()) errors.title = "Title is required.";

  const price = Number(input.price);
  if (input.price.trim() === "" || Number.isNaN(price)) {
    errors.price = "Price must be a number.";
  } else if (price <= 0) {
    errors.price = "Price must be greater than 0."; // business rule: no free/negative products
  }

  const stock = Number(input.stock);
  if (input.stock.trim() === "" || Number.isNaN(stock)) {
    errors.stock = "Stock must be a number.";
  } else if (stock < 0) {
    errors.stock = "Stock cannot be negative.";
  }

  if (input.discountPercentage.trim() !== "") {
    const discount = Number(input.discountPercentage);
    if (Number.isNaN(discount)) {
      errors.discountPercentage = "Discount must be a number.";
    } else if (discount < 0 || discount > 100) {
      errors.discountPercentage = "Discount must be between 0 and 100.";
    } else if (!Number.isNaN(price) && (discount / 100) * price >= price) {
      // business rule: a discount can never make the item free or negative
      errors.discountPercentage = "Discount cannot bring the price to 0 or below.";
    }
  }

  return errors;
}
