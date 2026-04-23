import { NextResponse } from "next/server";

export const revalidate = 5;

const N_RESULTS = 4;

type AssetCtx = {
  markPx: string;
  prevDayPx: string;
  dayNtlVlm: string;
};

type Ticker = {
  symbol: string;
  label: string;
  price: number;
  change24h: number;
  positive: boolean;
};

type Sortable = Ticker & { _vol: number };

async function fetchDex(dex: string | null): Promise<Array<{ name: string; ctx: AssetCtx }>> {
  const body = dex
    ? { type: "metaAndAssetCtxs", dex }
    : { type: "metaAndAssetCtxs" };
  const res = await fetch("https://api.hyperliquid.xyz/info", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    next: { revalidate: 5 },
  });
  if (!res.ok) throw new Error(`HL ${dex ?? "main"} ${res.status}`);
  const [meta, ctxs] = (await res.json()) as [
    { universe: Array<{ name: string }> },
    AssetCtx[]
  ];
  return meta.universe.map((u, i) => ({ name: u.name, ctx: ctxs[i] }));
}

function buildTicker(
  name: string,
  ctx: AssetCtx
): Sortable | null {
  const price = Number(ctx.markPx);
  const prev = Number(ctx.prevDayPx);
  const vol = Number(ctx.dayNtlVlm);
  if (!Number.isFinite(price) || !Number.isFinite(prev) || prev <= 0) return null;
  if (!Number.isFinite(vol)) return null;
  const change = ((price - prev) / prev) * 100;
  // HIP-3 markets come back as "xyz:SP500" etc.; strip dex prefix for display.
  const display = name.includes(":") ? name.split(":").slice(-1)[0] : name;
  return {
    symbol: name,
    label: `${display}-USDC`,
    price,
    change24h: change,
    positive: change >= 0,
    _vol: vol,
  };
}

export async function GET() {
  try {
    // Main dex + HIP-3 "xyz" dex. Failures on xyz shouldn't sink the whole list.
    const [main, xyz] = await Promise.all([
      fetchDex(null),
      fetchDex("xyz").catch(() => [] as Array<{ name: string; ctx: AssetCtx }>),
    ]);

    const tickers: Sortable[] = [];
    for (const { name, ctx } of [...main, ...xyz]) {
      const t = buildTicker(name, ctx);
      if (t) tickers.push(t);
    }
    tickers.sort((a, b) => b._vol - a._vol);

    const top = tickers.slice(0, N_RESULTS).map(({ _vol, ...rest }) => {
      void _vol;
      return rest;
    });

    return NextResponse.json(top, {
      headers: { "cache-control": "public, s-maxage=5, stale-while-revalidate=15" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 502 }
    );
  }
}
