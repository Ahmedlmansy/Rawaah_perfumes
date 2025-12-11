import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CenterTitle from "@/components/ui/CenterTitle";
import React from "react";

export default function Wishlist() {
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <CenterTitle title="Wishlist" />
      </div>
      <Footer />
    </div>
  );
}
