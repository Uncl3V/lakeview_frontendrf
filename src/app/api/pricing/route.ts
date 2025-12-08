// import { NextResponse } from "next/server";

// export async function GET() {
//   return NextResponse.json({
//     plans: [
//       {
//         category: "perVisit",
//         title: "One-Time Telehealth Consultation",
//         price: "₦5,000",
//         period: "consultation",
//         features: [
//           "Up to 20 mins virtual assessment",
//           "Basic health advice (non-emergency)",
//           "24-hour chat follow-up",
//           "Saves transport cost & time",
//         ],
//         actionLabel: "Book Now",
//       },
//       {
//         category: "perVisit",
//         title: "Home-Based Care - Category A",
//         price: "₦20,000",
//         period: "visit",
//         features: [
//           "Vital signs check",
//           "Simple catheter care",
//           "Wound dressing (clean wound)",
//           "Basic medication admin.",
//           "Basic patient assessment & advice",
//         ],
//         actionLabel: "Request Service",
//       },
//       {
//         category: "subscription",
//         title: "Individual Basic Plan",
//         price: "₦50,000",
//         period: "month",
//         features: [
//           "Unlimited telehealth",
//           "Priority booking",
//           "1 Free home visit (Cat A)",
//           "10% discount on visits",
//         ],
//         actionLabel: "Choose Plan",
//       },
//       {
//         category: "subscription",
//         title: "Family Premium Plan",
//         price: "₦400,000",
//         period: "month",
//         features: [
//           "Unlimited telehealth (6 members)",
//           "7 FREE Home Visits/Month",
//           "Annual virtual health assessment",
//           "20% discount on visits",
//           "Dedicated care coordinator",
//           "Quarterly family health workshop",
//         ],
//         actionLabel: "Choose Plan",
//       },
//     ],
//   });
// }


// app/api/pricing/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    plans: [
      // ====================
      // Per-Visit / One-Time Consultation
      // ====================
      {
        category: "perVisit",
        title: "One-Time Telehealth Consultation",
        price: "₦5,000",
        period: "consultation",
        features: [
          "Up to 20 mins virtual assessment",
          "Basic health advice (non-emergency) & education",
          "24-hour chat follow-up",
          "Saves transport cost & time",
        ],
        actionLabel: "Book Now",
      },
      {
        category: "perVisit",
        title: "Home-Based Care - Category A",
        price: "₦20,000",
        period: "visit",
        features: [
          "Vital signs check",
          "Simple Catheter care",
          "Wound dressing (Clean wound)",
          "Basic medication (oral and injections) admin.",
          "Basic patient assessment and Health advice",
        ],
        actionLabel: "Request Service",
      },
      {
        category: "perVisit",
        title: "Home-Based Care - Category B",
        price: "₦35,000",
        period: "visit",
        features: [
          "Complex wound dressing",
          "IV fluid monitoring & admin.",
          "Initial post-op checks",
          "Basic Stoma Care and Patient Education",
          "Detailed patient assessment and care plan review",
        ],
        actionLabel: "Request Service",
      },
      {
        category: "perVisit",
        title: "Home-Based Care - Category C",
        price: "₦55,000",
        period: "visit",
        features: [
          "Intensive post-op care",
          "Specialized IV medication admin. (Prescription)",
          "Comprehensive Patient Education (e.g. Device training)",
          "Extended condition monitoring",
          "Family health education session",
          "Specialized Palliative Care support",
        ],
        actionLabel: "Request Service",
      },

      // ====================
      // Subscription Plans (Monthly)
      // ====================
      {
        category: "subscription",
        title: "Individual Basic Plan",
        price: "₦50,000",
        period: "month",
        features: [
          "Unlimited telehealth Consultation",
          "Priority booking",
          "1 Free home visit (Category A)",
          "10% discount on any home visit",
        ],
        actionLabel: "Choose Plan",
      },
      {
        category: "subscription",
        title: "Individual Premium Plan",
        price: "₦120,000",
        period: "month",
        features: [
          "Unlimited telehealth Consultation",
          "2 FREE Home Visit/Month (Cat A or B)",
          "Priority booking & extended hours",
          "15% discount on additional visits",
          "Home sample collection",
          "Dedicated nurse care coordinator",
        ],
        actionLabel: "Choose Plan",
      },
      {
        category: "subscription",
        title: "Student Plan",
        price: "₦20,000",
        period: "month",
        features: [
          "Unlimited nurse-led telehealth",
          "Student health resources",
          "Optional: ₦7,500 flat fee for 1 Cat A Home Visit/semester",
          "Access to Student-focused health education resources",
        ],
        actionLabel: "Choose Plan",
      },
      {
        category: "subscription",
        title: "Couple Premium Plan",
        price: "₦200,000",
        period: "month",
        features: [
          "Unlimited telehealth for 2 persons",
          "5 FREE Home Visits/Month (Cat A or B, shared)",
          "Priority booking & extended hours",
          "15% discount on additional visits",
          "1 Pre/post-natal virtual/home support visit",
        ],
        actionLabel: "Choose Plan",
      },
      {
        category: "subscription",
        title: "Family Premium Plan (up to 6 persons)",
        price: "₦400,000",
        period: "month",
        features: [
          "Unlimited telehealth for 6 named members",
          "7 FREE Home Visits/Month (Mix A/B, shared)",
          "Annual virtual health assessment",
          "20% discount on additional visits",
          "Dedicated care coordinator",
          "One Virtual health workshop/Q&A Session per quarter for your family",
        ],
        actionLabel: "Choose Plan",
      },
    ],
  });
}
