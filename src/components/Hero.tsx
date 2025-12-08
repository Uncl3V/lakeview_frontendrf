
"use client";

import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[800px] overflow-hidden flex items-center justify-center text-center px-5 py-8 md:py-12 bg-[#0A1C38]"
    >
      {/* Background images wrapper */}
      <div className="absolute inset-0 z-[1]">
        {/* Image 1 */}
        <div className="absolute top-[5%] left-[5%] w-[45%] h-[60%] grayscale-[50%] opacity-70 transition-all duration-300">
          <Image
            src="/image1.jpg"
            alt="Lakeview hero 1"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>

        {/* Image 2 */}
        <div className="absolute bottom-[6%] right-[5%] w-[40%] h-[55%] rotate-[-5deg] opacity-75 transition-all duration-300">
          <Image
            src="/image2.png"
            alt="Lakeview hero 2"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>

        {/* Image 3 */}
        <div className="absolute top-[20%] left-[40%] w-[35%] h-[45%] opacity-75 z-0 transition-all duration-300">
          <Image
            src="/image3.png"
            alt="Lakeview hero 3"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[2] text-white max-w-3xl bg-black/50 backdrop-blur-[2px] p-8 md:p-12 rounded-xl shadow-lg border border-white/10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-[#00BCD4] drop-shadow-lg">
          Welcome to Lakeview Health Services Limited
        </h1>

        <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Bringing affordable, accessible, and professional home-based and
          virtual healthcare to your doorstep. We bridge the gap between
          patients and quality care through innovative telehealth and in-person
          services.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#book"
            className="inline-block px-6 py-3 rounded-md font-semibold text-[#0A1C38] bg-[#00BCD4] hover:bg-[#00a9bd] transition shadow-sm"
          >
            Book Appointment
          </a>

          <a
            href="#services"
            className="inline-block px-6 py-3 rounded-md font-semibold text-white bg-[#0A1C38] border border-white/10 hover:bg-[#246E71] transition"
          >
            Our Services
          </a>

          <a
            href="#team"
            className="inline-block px-6 py-3 rounded-md font-semibold text-white bg-[#0A1C38] border border-white/10 hover:bg-[#246E71] transition"
          >
            Meet Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
