"use client";
import React from "react";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  actionLabel: string;
  onAction: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  features,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-white p-8 max-w-[380px] w-[380px] rounded-lg shadow-sm border-2 border-gray-200 text-center transition-transform duration-300 hover:-translate-y-5 hover:border-[#246E71] flex flex-col justify-between">
      <h4 className="text-2xl  font-semibold text-[#0A1C38] mb-6">{title}</h4>
      <div className="text-4xl font-bold text-[#00BCD4] mb-13">
        {price}
        <span className="text-sm font-normal text-gray-500">/{period}</span>
      </div>
      <ul className="text-left mb-6 flex-grow">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="py-4 border-b border-dashed border-gray-200 text-gray-600"
          >
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onAction}
        className="inline-block bg-[#00BCD4] text-[#0A1C38] px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-[#0097A7]"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default PricingCard;
