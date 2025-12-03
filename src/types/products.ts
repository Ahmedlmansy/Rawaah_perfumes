export interface Product {
   name: string;
  brand: string;
  price: number;
  discount_price?: number;
  type: string;
  image: string;
  size: number;
  stock: number;
  Best_Sellers: boolean;
  season: string;
  description: string;
  notes: string[];
}