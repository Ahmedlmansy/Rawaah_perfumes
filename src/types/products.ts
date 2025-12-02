export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount_price: number | null;
  type: "Men" | "Women" | "Unisex";
  image: string;
  size: number;
  created_at: string;
  stock: number;
  Best_Sellers: boolean;
}