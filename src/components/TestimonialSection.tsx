"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  message: string;
  author: string;
}

export default function TestimonialSection() {
  const [title, setTitle] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();
        setTitle(data.title);
        setTestimonials(data.testimonials || []);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading testimonials...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section id="testimonials"  className="container mt-5 bg-white max-w-7xl mx-auto px-4 py-10  rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
      <h2 className="text-3xl font-bold text-center text-[#0A1C38] mb-10">{title}</h2>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="relative bg-gray-50 p-8 rounded-xl shadow-md text-gray-600 italic"
          >
            <span className="absolute text-6xl text-cyan-400 opacity-20 top-2 left-4 leading-none select-none">
            “
            </span>
            <p className="relative z-10 mt-6">{item.message}</p>
            <p className="author text-right font-semibold text-[#0A1C38]  mt-4 not-italic">
              — {item.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
