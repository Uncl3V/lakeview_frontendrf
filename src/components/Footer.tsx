"use client";

import Link from "next/link";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="relative bg-[#0A2540] text-white text-center py-12 px-6 mt-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-2 font-semibold">
          Ready to experience healthcare redefined?
        </p>
        <p className="mb-6 text-gray-200">
          Visit us on WhatsApp, Instagram, or call today!
        </p>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <a
            href="https://wa.me/2349121675872?text=Hello%20Lakeview%20Health%20Services%2C%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <Image
              src="/wa.jpg"
              alt="WhatsApp"
              width={30}
              height={30}
              className="hover:opacity-80 transition-opacity duration-300"
            />
          </a>

          <a
            href="https://www.facebook.com/share/18oF6tgnL7/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Image
              src="/fb.jpg"
              alt="Facebook"
              width={30}
              height={30}
              className="hover:opacity-80 transition-opacity duration-300"
            />
          </a>

          <a
            href="https://instagram.com/LakeviewHSL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/ig.jpg"
              alt="Instagram"
              width={30}
              height={30}
              className="hover:opacity-80 transition-opacity duration-300"
            />
          </a>

          <a
            href="https://twitter.com/LakeviewHSL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter/X"
          >
            <Image
              src="/X.jpg"
              alt="Twitter/X"
              width={30}
              height={30}
              className="hover:opacity-80 transition-opacity duration-300"
            />
          </a>
        </div>

        {/* Footer Navigation */}
        <nav className="flex justify-center gap-6 text-gray-300 text-sm mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors duration-300">
            Home
          </Link>
          <Link href="/services" className="hover:text-cyan-400 transition-colors duration-300">
            Services
          </Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors duration-300">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors duration-300">
            Contact
          </Link>
        </nav>

        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Lakeview Health Services Limited. All rights reserved.
        </p>
      </div>

      {/* Back to Top Button */}
      {/* {showScroll && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-24 right-6 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-t-4xl shadow-lg transition-all duration-300 ease-in-out animate-fadeIn"
        >
          <ArrowBigUpDash
            size={44}
            className="text-white"
            strokeWidth={1.5}/> 
        </button>
      )} */}
    </footer>
  );
}
