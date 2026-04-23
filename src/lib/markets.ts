export type HLTicker = {
  symbol: string;
  label: string;
  price: number;
  change24h: number;
  positive: boolean;
};

export type PMMarket = {
  question: string;
  yesPrice: number;
  slug: string;
};

export async function fetchHyperliquid(
  signal?: AbortSignal
): Promise<HLTicker[]> {
  const res = await fetch("/api/markets/hl", { signal });
  if (!res.ok) throw new Error(`HL ${res.status}`);
  return (await res.json()) as HLTicker[];
}

export async function fetchPolymarket(
  signal?: AbortSignal
): Promise<PMMarket[]> {
  const res = await fetch("/api/markets/pm", { signal });
  if (!res.ok) throw new Error(`PM ${res.status}`);
  const data = (await res.json()) as Array<{
    question: string;
    outcomePrices: string | string[];
    outcomes?: string | string[];
    slug: string;
  }>;

  const out: PMMarket[] = [];
  for (const m of data) {
    if (out.length >= 4) break;
    let prices: unknown = m.outcomePrices;
    if (typeof prices === "string") {
      try {
        prices = JSON.parse(prices);
      } catch {
        continue;
      }
    }
    if (!Array.isArray(prices) || prices.length === 0) continue;
    const yesPrice = Number(prices[0]);
    // Only skip fully-resolved markets (exactly 0 or 1). Everything else is real live data.
    if (!Number.isFinite(yesPrice) || yesPrice <= 0.005 || yesPrice >= 0.995) continue;
    if (!m.question || !m.slug) continue;
    out.push({
      question: m.question,
      yesPrice,
      slug: m.slug,
    });
  }
  return out;
}

const BASE = "https://trade.aura.money";

// TODO: wire deep-links once the trade.aura.money URL scheme is confirmed.
// For now all market rows send users to the app's entry point.
export function hlTradeUrl(_symbol: string): string {
  return BASE;
}

export function pmTradeUrl(_slug: string): string {
  return BASE;
}

export function fmtPrice(n: number): string {
  if (n >= 1000)
    return `$${n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  if (n >= 10) return `$${n.toFixed(2)}`;
  if (n >= 1) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(4)}`;
}

export function fmtChange(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}
