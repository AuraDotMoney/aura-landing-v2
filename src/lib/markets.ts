export type HLTicker = {
  symbol: string;
  label: string;
  price: number;
  change24h: number;
  positive: boolean;
};

export type PMMarket = {
  /** Event title (e.g. "2028 Democratic Presidential Nominee") */
  title: string;
  /** Event slug used to build /predictions/event/{slug} */
  slug: string;
  /** Label for the leading outcome: "Yes" for binary events, candidate name for multi */
  leadLabel: string;
  /** Leading outcome probability, 0–100 (rounded, integer) */
  leadPercent: number;
};

export async function fetchHyperliquid(
  signal?: AbortSignal
): Promise<HLTicker[]> {
  const res = await fetch("/api/markets/hl", { signal });
  if (!res.ok) throw new Error(`HL ${res.status}`);
  return (await res.json()) as HLTicker[];
}

type PMEventRaw = {
  title: string;
  slug: string;
  markets?: Array<{
    question?: string;
    groupItemTitle?: string;
    outcomePrices?: string | string[];
  }>;
};

function parsePrices(value: unknown): number[] | null {
  let v = value;
  if (typeof v === "string") {
    try {
      v = JSON.parse(v);
    } catch {
      return null;
    }
  }
  if (!Array.isArray(v)) return null;
  const nums = v.map((x) => Number(x));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

export async function fetchPolymarket(
  signal?: AbortSignal
): Promise<PMMarket[]> {
  const res = await fetch("/api/markets/pm", { signal });
  if (!res.ok) throw new Error(`PM ${res.status}`);
  const data = (await res.json()) as PMEventRaw[];

  // /events is already sorted by volume24hr desc, so we just take the top 4.
  // For each event, find the leading outcome across its child markets: binary
  // events use "Yes" + their single market's probability; multi-outcome events
  // use the top candidate's groupItemTitle + probability.
  const out: PMMarket[] = [];
  for (const e of data) {
    if (out.length >= 4) break;
    if (!e.title || !e.slug || !e.markets?.length) continue;

    const binary = e.markets.length === 1;
    let lead: { label: string; price: number } | null = null;

    for (const m of e.markets) {
      const prices = parsePrices(m.outcomePrices);
      if (!prices || prices.length === 0) continue;
      const yes = prices[0];
      const label = binary
        ? "Yes"
        : (m.groupItemTitle?.trim() || m.question?.trim() || "").slice(0, 40);
      if (!label) continue;
      if (lead === null || yes > lead.price) lead = { label, price: yes };
    }

    if (!lead) continue;
    out.push({
      title: e.title,
      slug: e.slug,
      leadLabel: lead.label,
      leadPercent: Math.round(lead.price * 100),
    });
  }
  return out;
}

const BASE = "https://trade.aura.money";

// URL scheme (from aura-frontend packages/core/src/utils/trade-url.ts):
// - perps:  /trade/BTC
// - HIP-3:  /trade/xyz:CL  (dex prefix + ":" + symbol, preserved verbatim)
// - PM:     /predictions/event/{market-slug}
export function hlTradeUrl(symbol: string): string {
  if (!symbol) return BASE;
  return `${BASE}/trade/${encodeURIComponent(symbol)}`;
}

export function pmTradeUrl(slug: string): string {
  if (!slug) return BASE;
  return `${BASE}/predictions/event/${encodeURIComponent(slug)}`;
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
