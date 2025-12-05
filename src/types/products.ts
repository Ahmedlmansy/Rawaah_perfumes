export interface Product {
  id : string
  name: string;
  brand: string;
  price: number;
  discount_price: number | null;
  type: "Men" | "Women" | "Unisex";
  image: string;
  size: number;
  stock: number;
  Best_Sellers: boolean;
  season: string;
  description: string;
  notes: string[];
  created_at: string
}