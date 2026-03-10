import { NextRequest, NextResponse } from "next/server";
import { getRates } from "@/lib/rates";

export async function GET(req: NextRequest) {
  try {
    const base = req.nextUrl.searchParams.get("base") ?? "USD";
    const data = await getRates(base);
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch rates" },
      { status: 500 }
    );
  }
}
