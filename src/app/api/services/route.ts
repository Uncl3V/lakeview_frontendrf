import { NextResponse } from "next/server";

// Mock services data (could later come from DB)
const services = [
  {
    id: "1",
    title: "Home-based Doctor Visits",
    description: "General consultations, chronic care follow-up, post-surgical care, and more."
  },
  {
    id: "2",
    title: "Sample Collection & Phlebotomy",
    description: "Experienced nurses visit your location for painless and professional sample collection."
  },
  {
    id: "3",
    title: "Virtual Medical Consultations",
    description: "Speak to qualified doctors via video or audio at your convenience."
  },
  {
    id: "4",
    title: "Nursing Care Services",
    description: "Wound dressing, BP checks, injections, and other vital nursing care."
  },
  {
    id: "5",
    title: "Health Education & Medication Reminders",
    description: "Personalized health advice and timely medication reminders."
  },
  {
    id: "6",
    title: "Corporate Staff Health Screening",
    description: "Comprehensive health screening programs for your corporate staff."
  },
];

const details = [
  {
    id: "1",
    title: "Phlebotomy & Sample Collection",
    description: "Experienced nurses visit your location for painless and professional sample collection."
  },
  {
    id: "2",
    title: "Telemedicine",
    description: "Speak to qualified doctors via video or audio at your convenience."
  },
  {
    id: "3",
    title: "Home Visits",
    description: "General consultations, chronic care follow-up, post-surgical care, and more."
  }
];

// API GET handler
export async function GET() {
  return NextResponse.json({ services, details });
}
