import React from "react";
type Props = {
  title: string;
};
export default function CenterTitle({ title }: Props) {
  return (
    <div className="flex justify-center flex-col items-center gap-5 mt-5">
      <div className=" uppercase text-[#0a0a0a] text-[28px] font-bold">
        {title}
      </div>
      <div className="line h-[4px] w-[70px] bg-[#ab8e66]"></div>
    </div>
  );
}
