export type CartProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount_price?: number | null;
  image: string;
  size: number;
};

export type CartItem = {
  product: CartProduct;
  quantity: number;
};
