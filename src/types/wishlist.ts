export type WishlistProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount_price: number | null;
  image: string;
  size: number;
  type: string;
};

export type WishlistItem = {
  items: WishlistProduct[];
  id: string
  name : string
  price: number
  discount_price: number
  stock: number
  size: number
  brand: string
  image : string
};
