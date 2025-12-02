import { Banners, BannersHome } from "@/components/Banners";
import BlogCard from "@/components/BlogCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import ProductsHome from "@/components/ProductsHome";
import Slider from "@/components/Slider";
import CenterTitle from "@/components/ui/CenterTitle";
import { Product } from "@/types/products";
export const productsShow: Product[] = [
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
  {
    id: "081e86ee-6b1b-4a65-a127-750cc1b3d523",
    name: "Scandal",
    brand: "Jean Paul",
    price: 89,
    discount_price: 50,
    type: "Women",
    image:
      "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/Scandal.avif",
    size: 100,
    created_at: "2025-11-28 18:33:51.79264+00",
    stock: 100,
    Best_Sellers: false,
  },
] as const;
//
export default function Home() {
  return (
    <div className="">
      {/* 
      Slider
      */}
      <div className="container mx-auto mt-5">
        <Slider />
      </div>
      {/* 
      Banners
      */}
      <div className="mt-5">
        <Banners />
      </div>
      {/* 
      Products Home
      */}
      <div className="showProducts">
        <ProductsHome />
      </div>
      {/* 
      Banner Home
      */}
      <div
        className="w-full h-[500px] mt-10 
        bg-center
       bg-[url(/img/banner/banner-home-1.jpg)]"
      >
        <div className="container flex flex-col justify-center h-full mx-auto">
          <div>
            <h5 className="text-[#ab8e66] text-[16px] font-semibold">
              Celebrate Day Sale!
            </h5>
            <h3 className="text-[30px] font-bold mt-2">
              Save 25% Of On All <br />
              Items Collection
            </h3>
            <a href="#" className="underline mt-4 inline-block">
              Shop now
            </a>
          </div>
        </div>
      </div>
      <div className="">
        <CenterTitle title="Featured Products" />
      </div>
      {/* 
      Featured Products
      */}
      <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 container mx-auto  ">
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
      </div>
      {/* 
      Banners Home 2
      */}
      <BannersHome />

      {/* 
      Some Blogs
      */}
      <CenterTitle
        title="
                    Our Latest News
                "
      />
      <div className="container mx-auto mt-8">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
}
