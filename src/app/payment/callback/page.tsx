

import { Suspense } from "react";
import PaymentCallbackClient from "./PaymentCallbackClient";

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BCD4]" />
        </div>
      }
    >
      <PaymentCallbackClient />
    </Suspense>
  );
}
