import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

export default function FeaturedProductCard() {
  return (
    <div>
      <div className="border flex gap-5">
        <div className="img">
          <Image
            alt=""
            src={"/img/banner/banner-home-13.jpg"}
            width={150}
            height={150}
          />
        </div>
        <div className="info flex flex-col justify-between py-5">
          <div className="">
            <p className="title text-[16px] font-bold text-[#ab8e66]">
              Suction Return
            </p>
            <p className="text-sm text-muted-foreground mt-1">Burberry</p>
            <p className="Price text-xl font-bold text-amber-900">399$</p>
          </div>
          <Button variant={"default"}> Shop Now </Button>
        </div>
      </div>
    </div>
  );
}
