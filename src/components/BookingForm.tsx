"use client";

import React, { useState } from "react";

interface FormData {
  fullName: string;
  contactNumber: string;
  email: string;
  serviceRequired: string;
  preferredDateTime: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactNumber: "",
    email: "",
    serviceRequired: "",
    preferredDateTime: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateField = (name: keyof FormData, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full Name is required.";
        break;
      case "contactNumber":
        if (!value.trim()) {
          error = "Contact Number is required.";
        } else if (!/^\d{10,15}$/.test(value)) {
          error = "Enter a valid phone number (10–15 digits).";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Enter a valid email address.";
        }
        break;
      case "serviceRequired":
        if (!value.trim()) error = "Please select a service.";
        break;
      case "preferredDateTime":
        if (!value.trim()) {
          error = "Preferred Date & Time is required.";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Partial<FormData> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit appointment request.");
      }

      setSuccessMessage("Appointment request submitted successfully!");
      setFormData({
        fullName: "",
        contactNumber: "",
        email: "",
        serviceRequired: "",
        preferredDateTime: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      setSuccessMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="book"
      className="container max-w-7xl mx-auto px-5 py-5 bg-white shadow-md rounded-lg mt-8 mb-8">
      <div className="flex flex-col items-center">
       <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#0A1C38] mb-4">
        Book Appointment
      </h2>
      <div className="w-20 h-1 bg-[#00BCD4] rounded-2xl mb-6"></div>

      </div>


      <p className="text-center text-[#555] mb-8">
        Schedule Your Visit or Virtual Consultation. Choose a service, pick a
        time, and our team will be in touch.
      </p>

      <form
        id="bookingForm"
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[#f9f9f9] p-8 rounded-lg shadow"
      >
        {/* Full Name */}
        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="block mb-2 font-semibold text-[#0A1C38] text-sm"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border bg-white rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
              errors.fullName
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Contact Number */}
        <div className="mb-6">
          <label
            htmlFor="contactNumber"
            className="block mb-2 font-semibold text-[#0A1C38] text-sm"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 border bg-white  rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
              errors.contactNumber
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactNumber}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="bookingEmail"
            className="block mb-2 font-semibold text-[#0A1C38] text-sm"
          >
            Email
          </label>
          <input
            type="email"
            id="bookingEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border bg-white  rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Service Required */}
        <div className="mb-6">
          <label
            htmlFor="serviceRequired"
            className="block mb-2 font-semibold text-[#0A1C38] text-sm"
          >
            Service Required
          </label>
          <select
            id="serviceRequired"
            name="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            className={`w-full px-4 py-3 border bg-white  rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
              errors.serviceRequired
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          >
            <option value="">Select a Service</option>
            <option value="telehealth">
              One-Time Telehealth Consultation - ₦5,000
            </option>
            <option value="homeCareA">
              Home-Based Care - Category A - ₦20,000
            </option>
            <option value="homeCareB">
              Home-Based Care - Category B - ₦35,000
            </option>
            <option value="homeCareC">
              Home-Based Care - Category C - ₦55,000
            </option>
          </select>
          {errors.serviceRequired && (
            <p className="text-red-500 text-sm mt-1">
              {errors.serviceRequired}
            </p>
          )}
        </div>

        {/* Date & Time */}
        <div className="mb-6">
          <label
            htmlFor="preferredDateTime"
            className="block mb-2 font-semibold text-[#0A1C38] text-sm"
          >
            Preferred Date & Time
          </label>
          <input
            type="datetime-local"
            id="preferredDateTime"
            name="preferredDateTime"
            value={formData.preferredDateTime}
            onChange={handleChange}
            className={`w-full px-4 py-3 border bg-white  rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
              errors.preferredDateTime
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.preferredDateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.preferredDateTime}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#00BCD4] text-[#0A1C38] font-semibold rounded-md hover:bg-[#0097A7] transition-transform transform hover:-translate-y-1 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Appointment Request"}
        </button>

        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}
      </form>
    </section>
  );
}
