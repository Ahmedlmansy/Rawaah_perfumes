
export type WishlistProduct = {
  id : string
  name: string,
              brand: string,
              price: number,
              discount_price: number | null,
              image: string,
              size: number,
  type: string
  
};

export type WishlistItem = {
  items: WishlistProduct
};
