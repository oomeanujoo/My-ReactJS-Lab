import { createContext, ReactNode, useContext } from "react";

const ProductsContext = createContext("USD");

export function ProductsProvider({ children }: { children: ReactNode }) {
  // Supply the same currency to every Products page below this provider.
  return <ProductsContext.Provider value="USD">{children}</ProductsContext.Provider>;
}

export function useProductCurrency() {
  // useContext reads the currency from the nearest ProductsProvider.
  return useContext(ProductsContext);
}
