export interface Product {
  brand: string;
  date: string;
  description: string;
  id: string;
  img: string;
  name: string
  price: string
  seller: string
  sold: boolean
};

export type Optional<T> = T | null;
