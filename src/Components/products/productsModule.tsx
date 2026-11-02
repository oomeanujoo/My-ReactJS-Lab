import { Route, Routes } from "react-router-dom";
import ProductsList from "./products-list/productsList";
import ProductForm from "./product-form/productForm";
import { ProductsProvider } from "./productsContext";

export default function ProductsModule() {
  // Select the list or form placeholder using the URL under /products.
  return (
    <ProductsProvider>
    <Routes>
      {/* index is the default page: /products shows ProductsList. */}
      <Route index element={<ProductsList />} />
      {/* path="new" adds /new to the parent URL: /products/new shows ProductForm. */}
      <Route path="new" element={<ProductForm />} />
    </Routes>
    </ProductsProvider>
  );
}
