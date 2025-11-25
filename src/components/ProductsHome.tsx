"use client";
import React, { useState } from "react";
import BestSeller from "./ShowProductsCompoents/BestSeller";
import NewArrivals from "./ShowProductsCompoents/NewArrivals";
import TopRated from "./ShowProductsCompoents/TopRated";

export default function ProductsHome() {
  const [showProducts, setShowProducts] = useState(0);
  const dataProducts = [
    {
      id: 0,
      name: "Bestseller",
      compoents: <BestSeller />,
    },
    {
      id: 1,
      name: "New Arrivals",
      compoents: <NewArrivals />,
    },
    {
      id: 2,
      name: "Top Rated",
      compoents: <TopRated />,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="btns   flex justify-center">
        {/*
         */}
        {dataProducts.map((show) => {
          return (
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setShowProducts(show.id);
              }}
              className={` ${
                showProducts === show.id ? "bg-[#ab8e66]" : "bg-[#000]"
              } mx-5 text-lg font-medium relative rounded-[30px] py-[10px] px-[25px]  text-white inline-block`}
              key={show.id}
            >
              {" "}
              {show.name}
            </a>
          );
        })}
      </div>
      <div className="">{dataProducts[showProducts].compoents}</div>
    </div>
  );
}
