import { redis, CACHE_KEYS, CACHE_TTL } from "./redis";
import { prisma } from "./prisma";

const API_KEY = process.env.EXCHANGE_RATE_API_KEY!;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export interface RatesResponse {
  rates: Record<string, number>;
  base: string;
  lastUpdated: string;
  source: "cache" | "api" | "database";
}

export async function getRates(base: string = "USD"): Promise<RatesResponse> {
  const cacheKey = CACHE_KEYS.exchangeRates(base);

  // 1. Try Redis cache first (fastest)
  try {
    const cached = await redis.get<{
      rates: Record<string, number>;
      lastUpdated: string;
    }>(cacheKey);

    if (cached) {
      return { ...cached, base, source: "cache" };
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  // 2. Fetch from ExchangeRate API
  try {
    const res = await fetch(`${BASE_URL}/${API_KEY}/latest/${base}`);
    const data = await res.json();

    if (data.result === "success") {
      const rates = data.conversion_rates as Record<string, number>;
      const lastUpdated = new Date().toISOString();

      // Store in Redis cache
      await redis.setex(cacheKey, CACHE_TTL.rates, { rates, lastUpdated });

      // Store in DB as backup
      await saveRatesToDB(base, rates);

      return { rates, base, lastUpdated, source: "api" };
    }
  } catch (err) {
    console.error("ExchangeRate API error:", err);
  }

  // 3. Fallback to database
  const dbRates = await prisma.exchangeRate.findMany({
    where: { base },
    orderBy: { fetchedAt: "desc" },
  });

  if (dbRates.length > 0) {
    const rates = Object.fromEntries(
      dbRates.map((r) => [r.target, Number(r.rate)])
    );
    return {
      rates,
      base,
      lastUpdated: dbRates[0].fetchedAt.toISOString(),
      source: "database",
    };
  }

  throw new Error("Unable to fetch exchange rates from any source");
}

export async function getRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;
  const { rates } = await getRates(from);
  const rate = rates[to];
  if (!rate) throw new Error(`Rate not found for ${from}/${to}`);
  return rate;
}

async function saveRatesToDB(base: string, rates: Record<string, number>) {
  try {
    const upserts = Object.entries(rates).map(([target, rate]) =>
      prisma.exchangeRate.upsert({
        where: { base_target: { base, target } },
        update: { rate, fetchedAt: new Date() },
        create: { base, target, rate },
      })
    );
    await Promise.all(upserts);
  } catch (err) {
    console.error("DB rate save error:", err);
  }
}
