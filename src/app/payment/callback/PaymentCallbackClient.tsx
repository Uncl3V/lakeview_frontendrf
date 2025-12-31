"use client";

export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/config";
import Link from "next/link";

export default function PaymentCallbackClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<{
    amount?: string;
    reference?: string;
    bookingId?: string;
  }>({});

  useEffect(() => {
    async function verifyPayment() {
      const reference = searchParams.get("reference");
      
      if (!reference) {
        setStatus("failed");
        setMessage("No payment reference found");
        return;
      }

      try {
        const res = await fetch(
          API_ENDPOINTS.paymentsVerify(reference)
        );
        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          setMessage(data.message || "Payment verified successfully!");
          setPaymentDetails({
            amount: data.data.amount
              ? `₦${(data.data.amount / 100).toLocaleString()}`
              : undefined,
            reference: data.data.reference,
            bookingId: data.data.bookingId,
          });
        } else {
          setStatus("failed");
          setMessage(data.message || "Payment verification failed");
        }
      } catch (error) {
        setStatus("failed");
        setMessage("An error occurred while verifying payment");
        console.error("Payment verification error:", error);
      }
    }

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {status === "loading" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#00BCD4] mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-[#0A1C38] mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            {paymentDetails.amount && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-[#0A1C38]">
                    {paymentDetails.amount}
                  </span>
                </div>
                {paymentDetails.reference && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-sm text-[#0A1C38]">
                      {paymentDetails.reference}
                    </span>
                  </div>
                )}
                {paymentDetails.bookingId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-mono text-sm text-[#0A1C38]">
                      {paymentDetails.bookingId}
                    </span>
                  </div>
                )}
              </div>
            )}

            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent to your email address.
            </p>

            <Link
              href="/"
              className="inline-block w-full bg-[#00BCD4] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00ACC1] transition-colors"
            >
              Return to Home
            </Link>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center">
            <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="space-y-3">
              <Link
                href="/#book"
                className="inline-block w-full bg-[#00BCD4] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00ACC1] transition-colors"
              >
                Try Again
              </Link>
              <Link
                href="/"
                className="inline-block w-full bg-gray-200 text-[#0A1C38] px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
