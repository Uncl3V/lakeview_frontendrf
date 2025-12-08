"use client";

import React from "react";
import ServiceCard from "./ServiceCard";

const blogs = [
  {
    title: "Top 5 Benefits of Home Health Care in Nigeria",
    description:
      "Discover how home health care is transforming patient experiences and outcomes.",
  },
  {
    title: "Why Telemedicine is the Future of African Healthcare.",
    description:
      "Exploring the potential of virtual consultations to bridge healthcare gaps.",
  },
  {
    title: "Simple Health Checks You Can Do at Home.",
    description:
      "Empower yourself with easy, routine health checks from the comfort of your home.",
  },
];

const Blogs: React.FC = () => {
  return (
    <section id="portfolio" className="max-w-7xl mt-7 bg-white mx-auto px-4 py-2  rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
      <div className=" flex flex-col items-center text-center mb-10 ">
        <h2 className="text-3xl md:text-4xl font-bold mt-10 text-[#0A1C38] mb-4">
          News & Blog
        </h2>
          <div className="w-20 h-1 bg-[#00BCD4] rounded-2xl mt-3 mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay informed with our latest articles and health insights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <ServiceCard
            key={index}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
      <p className="text-gray-600 text-center mt-8">Read more on our blog for comprehensive health topics and updates.</p>
    </section>
  );
};

export default Blogs;
