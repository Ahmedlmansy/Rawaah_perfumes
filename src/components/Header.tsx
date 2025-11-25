import Image from "next/image";
import React from "react";
import Navigation from "./Navigation";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className="topHeader h-[10px] bg-[#A78B64]">
        <div className="container mx-auto">
          {/* <p className="text-[#fff] text-[16px]">
            Welcome to our online store!
                  </p> */}
          <p className=""></p>
        </div>
      </div>
      <div className="header mt-5 container mx-auto flex items-center justify-between">
        <div className="logo">
          <Image alt="" src={"/img/logo/scLogo.png"} width={80} height={80} />
        </div>
        <div className="navigation">
          <Navigation />
        </div>
        <div className="icons flex gap-6">
          <div className="cart relative">
            <Link href={"/cart"}>
              <Badge
                className="h-5 min-w-5 absolute rounded-full px-1 top-[-7px] left-[-17px] flex justify-center  text-center"
                variant="default"
              >
                0
              </Badge>
              <i className="fa-solid fa-cart-shopping text-[24px] text-[#A38862]"></i>
            </Link>
          </div>
          <div className="wishlist relative">
            <Link href={"/wishlist"}>
              <Badge
                className="h-5 min-w-5 absolute rounded-full px-1 top-[-7px] left-[-17px] flex justify-center  text-center"
                variant="default"
              >
                0
              </Badge>
              <i className="fa-regular fa-heart  text-[24px] text-[#A38862]"></i>
            </Link>
          </div>
          <div className="profile relative">
            <Link href={"/profile"}>
              <i className="fa-regular fa-user  text-[24px] text-[#A38862]"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
