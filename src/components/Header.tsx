import Image from "next/image";
import React from "react";
import Navigation from "./Navigation";
import RegistrationStatus from "./RegistrationStatus";

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
          <RegistrationStatus />
        </div>
      </div>
    </div>
  );
}
