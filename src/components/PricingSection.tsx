"use client";

import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";

interface PricingPlan {
  title: string;
  price: string;
  period: string;
  features: string[];
  actionLabel: string;
  category: "perVisit" | "subscription";
}

const PricingSection: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch("/api/pricing");
        if (!res.ok) throw new Error("Failed to fetch pricing");

        const data: { plans: PricingPlan[] } = await res.json();

        // ✅ Validate API response
        if (!data.plans || !Array.isArray(data.plans)) {
          throw new Error("Invalid data format from API");
        }

        setPlans(data.plans);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPricing();
  }, []);

  if (loading) {
    return (
      <section className="text-center py-20">
        <p className="text-gray-600">Loading pricing...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-20">
        <p className="text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  // Split per-visit and subscription categories
  const perVisitPlans = plans.filter((p) => p.category === "perVisit");
  const subscriptionPlans = plans.filter((p) => p.category === "subscription");

  return (
    <section id="pricing" className="max-w-7xl mt-7 bg-white mx-auto px-5 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1C38] mb-4">
        Affordable & Transparent Pricing
      </h2>
      <p className="text-center mb-10 text-gray-600">
        Choose from flexible packages:
      </p>

      {/* Per-Visit / One-Time Consultation */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-[#0A1C38] text-center mb-10 relative pb-2 after:content-[''] after:w-16 after:h-[3px] after:bg-[#00BCD4] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0">
          Per-Visit / One-Time Consultation
        </h3>

        <div className="flex flex-row flex-wrap justify-normal gap-8">
          {perVisitPlans.map((plan, idx) => (
            <PricingCard
              key={idx}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              actionLabel={plan.actionLabel}
              onAction={() => alert(`Selected: ${plan.title}`)}
            />
          ))}
        </div>
        <p className="text-center mt-8 italic text-gray-600">
          Add-ons: Distance Surcharge (₦2,500 - ₦5,000) | After-Hours/Weekend
          Fee (+20% of visit fee).
        </p>
      </div>

      {/* Subscription Plans */}
      <div>
        <h3 className="text-2xl font-semibold text-[#0A1C38] text-center mb-10 relative pb-2 after:content-[''] after:w-16 after:h-[3px] after:bg-[#00BCD4] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0">
          Subscription Plans (Monthly)
        </h3>

        <div className="flex flex-row flex-wrap justify-normal gap-8">
          {subscriptionPlans.map((plan, idx) => (
            <PricingCard
              key={idx}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              actionLabel={plan.actionLabel}
              onAction={() => alert(`Selected: ${plan.title}`)}
            />
          ))}
        </div>
        <p className="text-center mt-8 italic text-gray-600">
          Custom corporate packages available on request.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
