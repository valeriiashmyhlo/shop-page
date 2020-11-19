import { Product } from "./types";

export const map = <T, U>(seq: Iterable<T>, f: (x: T) => U): U[] => {
  const result: U[] = [];

  for (const x of seq) {
    result.push(f(x));
  }

  return result;
};

export const parseProducts = (
  products: Product[]
): { [key: string]: Product } => {
  const parsedProducts: { [key: string]: Product } = {};

  for (const product of products) {
    parsedProducts[product.id] = product;
  }

  return parsedProducts;
};
