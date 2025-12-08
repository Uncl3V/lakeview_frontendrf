"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("An error occurred. Please try again later.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="max-w-7xl bg-white mt-7 mx-auto px-6 py-7">
      <div className="text-center mb-10 flex flex-col items-center gap-5">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A1C38] ">
          Contact Us
        </h2>
        <div className="w-20 h-1 bg-[#00BCD4] rounded-2xl "></div>
        <p className="text-gray-700 mb-3 font-medium md:text-lg">
          Have questions or need to speak with a healthcare professional? We’re
          here for you.
        </p>
        <p className="text-gray-700">
          📞{" "}
          <a
            href="tel:+2349121675872"
            className="text-[#0A1C38] font-semibold hover:text-cyan-500 transition-colors"
          >
            +234-912-167-5872
          </a>
        </p>
        <p className="text-gray-700">
          📧{" "}
          <a
            href="mailto:Lakeviewhealthservices1@gmail.com"
            className="text-[#0A1C38] font-semibold hover:text-cyan-500 transition-colors"
          >
            Lakeviewhealthservices1@gmail.com
          </a>
        </p>
        <p className="text-gray-700">📍 Lagos | Nigeria</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[#f9f9f9] p-8 rounded-xl shadow-md"
      >
        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 font-semibold text-[#0A1C38]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full bg-white  px-4 py-3 border rounded-md text-gray-800 focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-cyan-200"
            }`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-[#0A1C38]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full bg-white  px-4 py-3 border rounded-md text-gray-800 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-cyan-200"
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 font-semibold text-[#0A1C38]"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`w-full bg-white  px-4 py-3 border rounded-md text-gray-800 focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-cyan-200"
            }`}
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-50 bg-[#00BCD4] text-[#0A1C38] font-semibold py-3 rounded-md hover:bg-cyan-600 transition-colors disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p
            className={`mt-4 text-center font-medium ${
              status.includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactSection;
