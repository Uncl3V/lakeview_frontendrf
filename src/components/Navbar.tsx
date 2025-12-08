"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-5">      
        <div className="flex items-center">
          {/* logo */}
          <Image
            src="/lakeviewlogo.jpg"
            alt="Lakeview Health Logo"
            width={120}
            height={120}
            className="mr-2"
            priority
          />
         <div className="ml-2 flex flex-col">
          <Link href="/" className="text-xl font-bold text-[#0A1C38]">
            Lakeview Health
          </Link>
          <p className="text-sm text-gray-600">HEALTH SERVICES LIMITED</p>
         </div>

        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Nav Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-white font-semibold left-0 w-full md:w-auto top-16 md:top-auto transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="p-2"><Link href="/">Home</Link></li>
          <li className="p-2"><Link href="#about">About Us</Link></li>
          <li className="p-2"><Link href="#team">Meet Our Team</Link></li>
          <li className="p-2"><Link href="#services">Services</Link></li>
          <li className="p-2"><Link href="#pricing">Pricing</Link></li>
          <li className="p-2"><Link href="#faqs">FAQ</Link></li>
          <li className="p-2"><Link href="#contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
