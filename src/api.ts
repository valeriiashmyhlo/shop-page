import {Product} from "./types";

export const getProducts = async (): Promise<Product[]> => (
    await fetch("https://5c78274f6810ec00148d0ff1.mockapi.io/api/v1/products")
  ).json();
