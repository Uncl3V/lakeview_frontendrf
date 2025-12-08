"use client";

import React from "react";
import ServiceCard from "./ServiceCard";

const projects = [
  {
    title: "Corporate Health Project: XYZ Tech Ltd",
    description:
      "We executed a 2-week staff wellness program including vitals check, mental health talks, and flu vaccines.",
  },
  {
    title: "Telemedicine Camp: Edo Rural Clinics",
    description:
      "Over 100 patients consulted via video for various ailments.",
  },
  {
    title: "Diabetes Monitoring Home Service",
    description:
      "Long-term home-based monitoring and management support for diabetes patients.",
  },
];

const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="max-w-7xl mt-7 bg-white mx-auto px-4  rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
      <div className=" flex flex-col items-center text-center mb-10 ">
        <h2 className="text-3xl md:text-4xl font-bold mt-10 text-[#0A1C38] mb-4">
          Recent Projects
        </h2>
          <div className="w-20 h-1 bg-[#00BCD4] rounded-2xl mt-3 mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Showcasing our commitment to accessible healthcare solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ServiceCard
            key={index}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
