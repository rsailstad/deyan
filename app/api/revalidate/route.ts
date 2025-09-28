import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "ISR hooks not wired yet" }, { status: 501 });
}
