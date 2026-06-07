import { NextResponse } from "next/server";
import { readSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await readSnapshot();
  return NextResponse.json(snapshot);
}
