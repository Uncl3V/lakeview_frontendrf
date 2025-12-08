// app/api/faqs/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const faqs = {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Q1: Are your services available nationwide?",
        answer:
          "A: We currently operate in Lagos and some other states in Nigeria with plans for expansion nationwide.",
      },
      {
        question: "Q2: What are your working hours?",
        answer: "A: 8AM – 6PM daily. Emergency care available on request.",
      },
      {
        question: "Q3: Can I book services for my elderly parents?",
        answer: "A: Absolutely. We offer elderly-focused care packages.",
      },
      {
        question: "Q4: What if I need to reschedule my home visit?",
        answer:
          "A: Please contact us at least 24 hours in advance to reschedule without incurring any fees.",
      },
      {
        question: "Q5: Is my virtual consultation data secure?",
        answer:
          "A: Yes, we use secure and encrypted platforms to ensure the privacy and confidentiality of your consultations.",
      },
    ],
  };

  return NextResponse.json(faqs);
}
