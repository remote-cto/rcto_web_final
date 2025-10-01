//app/api/insiderCircle/route.ts

import { NextResponse } from "next/server";
import { sendInsiderCircleEmail } from "@/lib/email/insiderCircleEmail";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "companyName",
      "websiteUrl",
      "priorities",
      "challenge",
      "techStage",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(formData.priorities) ||
      formData.priorities.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "At least one priority must be selected" },
        { status: 400 }
      );
    }

    try {
      new URL(formData.websiteUrl);
    } catch (_) {
      return NextResponse.json(
        { success: false, error: "Invalid website URL format" },
        { status: 400 }
      );
    }

    const result = await sendInsiderCircleEmail(formData);

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      throw new Error(result.error || "Failed to send email");
    }
  } catch (error) {
    console.error("Error in Insider Circle API route:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
