import { NextResponse } from "next/server";

export const revalidate = 20;

export async function GET() {
  // Matches what trade.aura.money's Predictions → Trending surfaces: events
  // (grouped multi-outcome markets) sorted by 24h volume.
  const url = new URL("https://gamma-api.polymarket.com/events");
  url.searchParams.set("active", "true");
  url.searchParams.set("closed", "false");
  url.searchParams.set("archived", "false");
  url.searchParams.set("limit", "20");
  url.searchParams.set("order", "volume24hr");
  url.searchParams.set("ascending", "false");

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 20 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) {
      return NextResponse.json({ error: `upstream ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "cache-control": "public, s-maxage=20, stale-while-revalidate=60" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 502 }
    );
  }
}
