import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log lead for development; replace with CRM webhook when ready
    console.log("[Lead received]", JSON.stringify(body, null, 2));

    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
  }
}
