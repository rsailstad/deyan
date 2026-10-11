import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, type, name, message } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
      return NextResponse.json(
        { message: "Received, but storage webhook not configured yet." },
        { status: 200 }
      );
    }

    const payload = {
      email,
      type: type || "newsletter",
      name: name || "",
      message: message || "",
      timestamp: new Date().toISOString(),
      notify: ["realdeyan@gmail.com", "rsailstad@gmail.com", "ancasailstad@yahoo.com"],
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Webhook submission error:", text);
      return NextResponse.json({ error: "Failed to forward submission" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Subscribe route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
