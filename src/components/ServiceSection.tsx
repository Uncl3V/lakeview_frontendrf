"use client";

import React, { useEffect, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
}

export default function ServiceSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [details, setDetails] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services"); 
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();

        setServices(data.services || []);
        setDetails(data.details || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="container mx-auto py-12 text-center">
        <p className="text-gray-500">Loading services...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="container  mx-auto py-12 text-center">
        <p className="text-red-500">⚠️ {error}</p>
      </section>
    );
  }

  return (
    <section id="services" className="container bg-white max-w-7xl shadow-2xl rounded-2xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1C38] text-center ">
        Services We Provide
      </h2>
         <div className="w-20 h-1 bg-[#00BCD4] rounded-2xl mt-5 mb-6"></div>
      </div>

      {/* Services Grid */}
      <div className="flex w-full flex-col items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#f3f3f3] max-w-[350px] p-10   border-t-4 border-[#246E71] text-center  rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
          >
            <h3 className="text-xl font-semibold text-[#0A1C38] mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      </div>


      {/* Service Details */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-[#0A1C38] text-center mb-8 border-b-2 border-cyan-400 inline-block pb-2">
          Services Details
        </h3>

        <div className="space-y-4 max-w-7xl mx-auto">
          {details.map((detail) => (
            <div
              key={detail.id}
              className="bg-[#f3f3f3] border-l-4 border-cyan-400 p-9 rounded-md shadow-sm"
            >
              <h4 className="text-lg font-semibold text-[#0A1C38] mb-2">
                {detail.title}
              </h4>
              <p className="text-gray-600">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
