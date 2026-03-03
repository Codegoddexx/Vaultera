import { create } from "zustand";
import { MOCK_WALLETS, MOCK_TRANSACTIONS, MOCK_ACTIVE_INVESTMENTS, MOCK_USER } from "@/lib/mockData";
import type { Wallet, Transaction, ActiveInvestment, User } from "@/types";

interface AppState {
  user: User;
  wallets: Wallet[];
  transactions: Transaction[];
  activeInvestments: ActiveInvestment[];
  selectedWalletId: string | null;
  setSelectedWalletId: (id: string) => void;
  getTotalBalanceUSD: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: MOCK_USER,
  wallets: MOCK_WALLETS,
  transactions: MOCK_TRANSACTIONS,
  activeInvestments: MOCK_ACTIVE_INVESTMENTS,
  selectedWalletId: "w1",
  setSelectedWalletId: (id) => set({ selectedWalletId: id }),
  getTotalBalanceUSD: () => {
    const rates: Record<string, number> = {
      USD: 1, EUR: 1.0847, GBP: 1.2622, NGN: 0.000625, AED: 0.2723,
    };
    return get().wallets.reduce((sum, w) => sum + w.balance * (rates[w.currency] || 1), 0);
  },
}));
