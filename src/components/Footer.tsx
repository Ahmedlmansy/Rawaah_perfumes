"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full mt-10 bg-[#f5f4f2] py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="font-semibold tracking-wide mb-4 text-sm">
            QUICK MENU
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>New arrivals</li>
            <li>Life style</li>
            <li>Accents</li>
            <li>Tables</li>
            <li>Dining</li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-semibold tracking-wide mb-4 text-sm">
            NEWSLETTER
          </h3>
          <p className="text-gray-600 max-w-xs mb-6">
            Sign up for our free video course and urban garden inspiration
          </p>

          <div className="w-full max-w-md space-y-4">
            <Input
              type="email"
              placeholder="Your email letter"
              className="rounded-full px-6 py-6 bg-white text-center"
            />

            <Button className="w-full rounded-full py-6 bg-[#b4956b] hover:bg-[#a5875f]">
              SUBSCRIBE
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold tracking-wide mb-4 text-sm">
            INFORMATION
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>FAQs</li>
            <li>Track Order</li>
            <li>Delivery</li>
            <li>Contact Us</li>
            <li>Return</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
