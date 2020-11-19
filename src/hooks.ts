import { useEffect, useState } from "react";
import { Optional, Product } from "./types";
import { parseProducts } from "./utils";

export const useLoadProducts = (
  getProducts: () => Promise<Product[]>
): [{ [id: string]: Product }, boolean, Optional<Error>] => {
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Optional<Error>>(null);

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      setLoaded(false);

      try {
        const products = await getProducts();
        if (ignore) return;
        setProducts(parseProducts(products));
      } catch (error) {
        setError(error);
      } finally {
        if (ignore) return;
        setLoaded(true);
      }
    };

    fetchProducts();
    return () => {
      ignore = true;
    };
  }, [getProducts]);

  return [products, isLoaded, error];
};
