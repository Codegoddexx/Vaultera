import { useState, useCallback } from "react";
import { MOCK_RATES } from "@/lib/constants";

export function useRates() {
  const [loading, setLoading] = useState(false);

  const getRate = useCallback((from: string, to: string): number => {
    if (from === to) return 1;
    const direct = MOCK_RATES[from]?.[to];
    if (direct) return direct;
    const toUSD = MOCK_RATES[from]?.USD || 1;
    const fromUSD = MOCK_RATES["USD"]?.[to] || 1;
    return toUSD * fromUSD;
  }, []);

  const convert = useCallback((amount: number, from: string, to: string) => {
    const rate = getRate(from, to);
    return { result: amount * rate, rate };
  }, [getRate]);

  return { getRate, convert, loading };
}
