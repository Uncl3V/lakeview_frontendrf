
"use client";

import { useEffect, useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [title, setTitle] = useState("");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faqs");
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        const data = await res.json();
        setTitle(data.title);
        setFaqs(data.items || []);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading FAQs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section id="faqs" className="container max-w-7xl bg-white mt-5  mx-auto px-4 py-20 rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
      <h2 className="text-3xl font-bold text-center text-[#0A1C38] mb-10">
        {title}
      </h2>

      <div className="space-y-4 max-w-5xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "bg-gray-50" : "bg-white"
            }`}
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center text-left text-[#0A1C38] font-bold text-lg px-6 py-6 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {faq.question}
              <span className="text-xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? "max-h-60 py-8 opacity-100"
                  : "max-h-30  opacity-100"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
