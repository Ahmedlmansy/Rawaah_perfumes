import React from "react";
import Link from "next/link";
export default function Navigation() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center h-20">
          <ul className="flex gap-8 items-center uppercase tracking-wide text-sm font-semibold">
            <li>
              <Link href="/" className="py-2 hover:text-black">
                Home
              </Link>
            </li>

            <li>
              <Link href="/brands" className="py-2 hover:text-black">
                Brands
              </Link>
            </li>

            <li>
              <Link href="/pages" className="py-2 hover:text-black">
                Shop
              </Link>
            </li>

            <li>
              <Link href="/notes" className="py-2 hover:text-black">
                Notes
              </Link>
            </li>

            <li>
              <Link href="/about" className="py-2 hover:text-black">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="py-2 hover:text-black">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
