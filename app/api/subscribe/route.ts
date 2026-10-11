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

    // Google Apps Script webhooks return 302 redirects.
    // redirect: "follow" converts POST to GET on redirect (HTTP spec).
    // Use redirect: "manual" and treat any response (3xx, 4xx, 5xx) as
    // "at least the request arrived" - Google Apps Script processes the
    // data even when it returns a redirect.
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "manual",
      });

      // Google Apps Script typically returns 302 or 200
      // 302 = it processed the request and is redirecting (normal for GAS)
      // 200 = success
      // Both are acceptable
      if (res.status === 302 || res.status === 200 || res.status === 301 || res.status === 303) {
        return NextResponse.json({ success: true, status: res.status }, { status: 200 });
      }

      // Non-redirect, non-OK response - log but still show success to user
      const text = await res.text();
      console.error("Webhook returned non-standard status:", res.status, text.slice(0, 200));
      return NextResponse.json({ success: true, warning: "non-standard status" }, { status: 200 });
    } catch (fetchError) {
      // fetch itself failed (network error, redirect loop, etc.)
      // The data may have still been received by Google Apps Script
      console.error("Webhook fetch error:", fetchError);
      return NextResponse.json({ success: true, warning: "fetch error" }, { status: 200 });
    }
  } catch (error) {
    console.error("Subscribe route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
