import { useState } from "react";
import { useRates } from "./useRates";

export function useConverter() {
  const { convert } = useRates();
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<{ result: number; rate: number } | null>(null);

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) return;
    const res = convert(Number(amount), fromCurrency, toCurrency);
    setResult(res);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return {
    fromCurrency, setFromCurrency,
    toCurrency, setToCurrency,
    amount, setAmount,
    result, handleConvert, handleSwap,
  };
}
