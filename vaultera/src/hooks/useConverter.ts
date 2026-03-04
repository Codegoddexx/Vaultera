import { useState } from "react";
import { useRates } from "./useRates";

export function useConverter() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  const { getRate } = useRates();

  const handleConvert = () => {
    const r = getRate(fromCurrency, toCurrency);
    const converted = amount * r;
    setRate(r);
    setResult(converted);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setRate(null);
  };

  return {
    fromCurrency, setFromCurrency,
    toCurrency, setToCurrency,
    amount, setAmount,
    result, rate,
    handleConvert, handleSwap,
  };
}
