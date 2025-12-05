import { Banners, BannersHome } from "@/components/Banners";
import BlogCard from "@/components/BlogCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsHome from "@/components/ProductsHome";
import Slider from "@/components/Slider";
import CenterTitle from "@/components/ui/CenterTitle";

export default function Home() {
  return (
    <div className="">
      <Header />
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
      <Footer />
    </div>
  );
}
