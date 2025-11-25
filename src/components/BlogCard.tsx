import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function BlogCard() {
  return (
    <div>
      <div className="cardBlog">
        <div className="">
          <Image
            alt=""
            src={"/img/blog/blog-2.jpg"}
            className="w-full"
            width={300}
            height={300}
          />
        </div>
        <div className="content flex flex-col gap-2">
          <p className="date text-[12px] text-[#aaa] uppercase">
            Agust 17, 09:14 am
          </p>
          <Link
            className="title text-[#000] hover:text-[#ab8e66] font-bold"
            href={"/blog"}
          >
            We design functional Items
          </Link>
          <div className="des text-[16px] text-[#666666]">
            Risus non porta suscipit lobortis habitasse felis, aptent interdum
            pretium ut.
          </div>
          <Button variant={"link"}>Read More</Button>
        </div>
      </div>
    </div>
  );
}
