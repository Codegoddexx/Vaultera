import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache keys
export const CACHE_KEYS = {
  exchangeRates: (base: string) => `rates:${base}`,
  userSession: (userId: string) => `session:${userId}`,
  rateStatus: "rates:status",
} as const;

// Cache TTL in seconds
export const CACHE_TTL = {
  rates: 60 * 30,        // 30 minutes
  session: 60 * 60 * 24, // 24 hours
} as const;
