import { useAppStore } from "@/store/useAppStore";
import { getCurrencySymbol, getCurrencyFlag, getCurrencyColor } from "@/lib/formatters";

export function useWallet() {
  const { wallets, selectedWalletId, setSelectedWalletId, transactions, getTotalBalanceUSD } = useAppStore();

  const selectedWallet = wallets.find((w) => w.id === selectedWalletId) || wallets[0];

  const getWalletTransactions = (currency: string) =>
    transactions.filter((t) => t.currency === currency);

  const enrichedWallets = wallets.map((w) => ({
    ...w,
    symbol: getCurrencySymbol(w.currency),
    flag: getCurrencyFlag(w.currency),
    color: getCurrencyColor(w.currency),
  }));

  return {
    wallets: enrichedWallets,
    selectedWallet,
    setSelectedWalletId,
    getWalletTransactions,
    totalBalanceUSD: getTotalBalanceUSD(),
  };
}
