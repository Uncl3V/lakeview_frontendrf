// app/api/testimonials/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const testimonials = {
    title: "What Our Clients Say",
    testimonials: [
      {
        message: "Lakeview has been a game-changer for my family. We no longer queue at hospitals.",
        author: "Mrs. Nkechi Obinna",
      },
      {
        message: "Their phlebotomy service is top-notch. The nurses are kind and skilled.",
        author: "Mr. Ayodele Benson",
      },
      {
        message: "Lakeview helped us set up a complete staff health plan. Great value!",
        author: "HR Manager, Genesis Corp.",
      },
    ],
  };

  return NextResponse.json(testimonials);
}
