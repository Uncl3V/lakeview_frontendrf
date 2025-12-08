"use client";

import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-[#f7f9fa] p-8 rounded-xl shadow-md text-center border-t-4 border-[#246E71] transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <h3 className="text-[#0A1C38] text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
