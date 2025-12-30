"use client";

import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/config";

interface ValidationError {
  field: string;
  message: string;
}

interface FormData {
  fullName: string;
  contactNumber: string;
  email: string;
  serviceRequired: string;
  preferredDateTime: string;
}

interface PlanDetails {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  period: string;
  category: string;
  features: string[];
}

interface BookingFormProps {
  planId?: string;
  planDetails?: PlanDetails;
}

export default function BookingForm({ planId, planDetails }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactNumber: "",
    email: "",
    serviceRequired: planDetails?.title || "",
    preferredDateTime: "",
  });

  // Update serviceRequired when planDetails changes
  useEffect(() => {
    if (planDetails?.title) {
      setFormData((prev) => ({ ...prev, serviceRequired: planDetails.title }));
    }
  }, [planDetails]);

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
        } else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(value)) {
          error = "Enter a valid phone number (10–15 characters, can include +, -, (), spaces).";
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
      // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
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

    // Prevent submission if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("Please fix all validation errors before submitting.");
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(`booking${firstErrorField.charAt(0).toUpperCase() + firstErrorField.slice(1)}`)?.focus();
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      // Create booking with pricingPlanSlug
      const bookingPayload: Record<string, unknown> = { 
        ...formData,
        // Convert datetime-local to ISO8601 format
        preferredDateTime: new Date(formData.preferredDateTime).toISOString(),
      };
      
      // Add pricingPlanSlug if planId is available (from URL)
      if (planId) {
        bookingPayload.pricingPlanSlug = planId;
      }

      console.log("Sending booking payload:", bookingPayload);

      const response = await fetch(API_ENDPOINTS.bookings, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend validation errors:", errorData);
        console.error("Payload sent:", bookingPayload);
        const errorMsg = errorData.errors 
          ? errorData.errors.map((e: ValidationError) => `${e.field}: ${e.message}`).join('\n')
          : errorData.message || "Failed to submit appointment request.";
        throw new Error(errorMsg);
      }

      const bookingData = await response.json();
      
      // If plan has a price, initiate payment
      if (planDetails && bookingData.success && bookingData.data.id) {
        const bookingId = bookingData.data.id;
        
        // Initialize payment (backend validates amount)
        const paymentPayload = {
          email: formData.email,
          amount: planDetails.priceValue, // Sent for reference, backend validates
          bookingId: bookingId,
          // callbackUrl is optional, backend will use default from env
        };

        console.log("Payment payload:", paymentPayload);

        const paymentResponse = await fetch(API_ENDPOINTS.paymentsInitialize, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentPayload),
        });

        if (!paymentResponse.ok) {
          const errorData = await paymentResponse.json();
          console.error("Payment validation errors:", errorData);
          const errorMsg = errorData.errors 
            ? errorData.errors.map((e: ValidationError) => `${e.field}: ${e.message}`).join('\n')
            : errorData.message || "Failed to initialize payment";
          throw new Error(errorMsg);
        }

        const paymentData = await paymentResponse.json();
        
        if (paymentData.success && paymentData.data.authorization_url) {
          // Redirect to Paystack payment page
          window.location.href = paymentData.data.authorization_url;
        } else {
          throw new Error("Invalid payment response");
        }
      } else {
        // No payment required, show success message
        setSuccessMessage("Booking request submitted successfully! We will contact you shortly.");
        setFormData({
          fullName: "",
          contactNumber: "",
          email: "",
          serviceRequired: "",
          preferredDateTime: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again later."
      );
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
            onChange={handleChange}            onBlur={handleBlur}
            required            className={`w-full px-4 py-3 border bg-white rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
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
            onChange={handleChange}            onBlur={handleBlur}
            required
            placeholder="+234 123 456 7890"            className={`w-full px-4 py-3 border bg-white  rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
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
            onBlur={handleBlur}
            required
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
          <input
            id="serviceRequired"
            name="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            readOnly={!!planDetails}
            className={`w-full px-4 py-3 border bg-white  rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 ${
              errors.serviceRequired
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
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
            onBlur={handleBlur}
            required
            min={new Date().toISOString().slice(0, 16)}
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
