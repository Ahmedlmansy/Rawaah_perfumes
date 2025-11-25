import React from "react";
import ProductCard from "../ProductCard";
export default function TopRated() {
  const fakeProducts = [
    {
      title: "Khamrah Lattafa Perfumes",
      brand: "Lattafa",
      price: "299$",
      size: "100ml",
      category: "Unisex",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.75805.jpg",
    },
    {
      title: "Dior Sauvage",
      brand: "Dior",
      price: "180$",
      size: "100ml",
      category: "Man",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.48356.jpg",
    },
    {
      title: "Bleu de Chanel",
      brand: "Chanel",
      price: "210$",
      size: "100ml",
      category: "Man",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.32761.jpg",
    },
    {
      title: "Burberry Hero",
      brand: "Burberry",
      price: "150$",
      size: "100ml",
      category: "Man",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.73292.jpg",
    },
    {
      title: "Versace Eros",
      brand: "Versace",
      price: "160$",
      size: "100ml",
      category: "Man",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.59284.jpg",
    },
    {
      title: "YSL Y Eau de Parfum",
      brand: "Yves Saint Laurent",
      price: "175$",
      size: "100ml",
      category: "Man",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.59486.jpg",
    },
    {
      title: "Prada Luna Rossa Carbon",
      brand: "Prada",
      price: "155$",
      size: "100ml",
      category: "Man",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.52747.jpg",
    },
    {
      title: "Armaf Club de Nuit Intense",
      brand: "Armaf",
      price: "85$",
      size: "105ml",
      category: "Unisex",
      imageSrc: "https://fimgs.net/mdimg/perfume-thumbs/375x500.40972.jpg",
    },
  ];
  return (
    <div>
      {" "}
      <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
        {fakeProducts.map((product) => {
          return (
            <div className="" key={product.title}>
              <ProductCard {...product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
