import React from "react";
import { Button } from "./ui/button";

export function Banners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto">
      <div className="banner-1  h-[300px] bg-[url(/img/banner/banner-home-10.jpg)] bg-no-repeat bg-center p-5">
        <div className="info pt-10">
          <h3 className="text-[26px] my-2 font-bold">Best Seller</h3>
          <p className="text-[16px] text-[#666666] mb-4">
            Check out our your <br />
            perfume collection now!
          </p>
          <Button variant={"outline"}>Shop Now</Button>
        </div>
      </div>
      <div className="banner-2  h-[300px] bg-[url(/img/banner/banner-home-12.jpg)] bg-no-repeat bg-center p-5">
        <div className="info text-center pt-10">
          <p className="text-[#ab8e66] text-[16px] font-semibold uppercase">
            End this weekend
          </p>
          <h3 className="text-[37px] font-bold">
            Big Sale <br />
            75% Off
          </h3>
          <div className="text-[13px] text-[#666666] mt-3">
            Use promo Code:
            <span className="text-[18px] text-[#ab8e66] font-semibold ml-2">
              STELINA
            </span>
          </div>
        </div>
      </div>
      <div className="banner-3  h-[300px] bg-[url(/img/banner/banner-home-11.jpg)] bg-no-repeat bg-center p-5">
        {" "}
        <div className="info pt-10">
          <h3 className="text-[26px] my-2 font-bold">Lookbook</h3>
          <p className="text-[16px] text-[#666666] mb-4">
            New Jewelry Collections <br />
            Summer Lookbook
          </p>
          <Button variant={"outline"}>Shop Now</Button>
        </div>
      </div>
    </div>
  );
}

export function BannersHome() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 container mx-auto">
        <div className=" ">
          <div className="banner-2  h-[300px] bg-[url(/img/banner/banner-home-14.jpg)] bg-no-repeat bg-center bg-cover p-5">
            <div className="info  pt-10">
              <p className="text-[#ab8e66] text-[16px] font-semibold uppercase">
                Jewelry Collection!
              </p>
              <h3 className="text-[37px] font-bold">
                Big Deal Of <br />
                The Day
              </h3>
              <div className="text-[13px] text-[#666666] mt-3">
                We’ve been waiting for you!
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="banner-2  h-[300px] bg-[url(/img/banner/banner-home-15.jpg)] bg-no-repeat bg-center bg-cover p-5">
            <div className="info  pt-10">
              <p className="text-[#ab8e66] text-[16px] font-semibold uppercase">
                Let’s us make your style!
              </p>
              <h3 className="text-[37px] font-bold">
                Best
                <br /> Collection
              </h3>
              <div className="text-[13px] text-[#666666] mt-3 w-[50%]">
                A complete shopping guide on what & how to wear it!
              </div>
            </div>
          </div>
        </div>
        <div className="flex-2"></div>
      </div>
    </div>
  );
}
