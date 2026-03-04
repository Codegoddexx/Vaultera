import type { Wallet, Transaction, InvestmentPlan, ActiveInvestment, ExchangeRate, User } from "@/types";

export const MOCK_USER: User = {
  id: "user_001",
  name: "Adachi Jessica",
  email: "adaeze@vaultera.com",
  kycVerified: true,
  tier: "Premium",
};

export const MOCK_WALLETS: Wallet[] = [
  { id: "w1", currency: "USD", balance: 4280.50, accountNumber: "VLT-USD-20240001", change: 2.3 },
  { id: "w2", currency: "EUR", balance: 1850.00, accountNumber: "VLT-EUR-20240001", change: -0.8 },
  { id: "w3", currency: "GBP", balance: 920.75, accountNumber: "VLT-GBP-20240001", change: 1.1 },
  { id: "w4", currency: "NGN", balance: 2150000, accountNumber: "VLT-NGN-20240001", change: -1.4 },
  { id: "w5", currency: "AED", balance: 5400.00, accountNumber: "VLT-AED-20240001", change: 0.3 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", type: "receive", currency: "EUR", amount: 500, from: "Mama", date: "2024-03-12", note: "Family transfer", status: "completed" },
  { id: "t2", type: "convert", currency: "USD", amount: 542.35, from: "EUR → USD", date: "2024-03-12", note: "Converted €500", status: "completed" },
  { id: "t3", type: "invest", currency: "USD", amount: 200, from: "USD Stable Growth", date: "2024-03-10", note: "3-month plan @ 8% p.a.", status: "active" },
  { id: "t4", type: "send", currency: "NGN", amount: 150000, from: "To Emeka", date: "2024-03-08", note: "Rent payment", status: "completed" },
  { id: "t5", type: "receive", currency: "USD", amount: 1200, from: "Freelance Client", date: "2024-03-05", note: "Project payment", status: "completed" },
  { id: "t6", type: "convert", currency: "NGN", amount: 800000, from: "USD → NGN", date: "2024-03-01", note: "Converted $500", status: "completed" },
];

export const MOCK_INVESTMENT_PLANS: InvestmentPlan[] = [
  { id: "p1", name: "Stable Growth", currency: "USD", roi: "8% p.a.", duration: "3 months", minAmount: 100, risk: "Low", color: "#10B981" },
  { id: "p2", name: "Balanced", currency: "USD", roi: "12% p.a.", duration: "6 months", minAmount: 500, risk: "Medium", color: "#3B82F6" },
  { id: "p3", name: "Aggressive", currency: "USD", roi: "18% p.a.", duration: "12 months", minAmount: 1000, risk: "High", color: "#8B5CF6" },
  { id: "p4", name: "Euro Saver", currency: "EUR", roi: "7% p.a.", duration: "3 months", minAmount: 100, risk: "Low", color: "#10B981" },
  { id: "p5", name: "Euro Plus", currency: "EUR", roi: "11% p.a.", duration: "6 months", minAmount: 500, risk: "Medium", color: "#3B82F6" },
  { id: "p6", name: "Euro Max", currency: "EUR", roi: "16% p.a.", duration: "12 months", minAmount: 1000, risk: "High", color: "#8B5CF6" },
  { id: "p7", name: "Sterling Safe", currency: "GBP", roi: "7.5% p.a.", duration: "3 months", minAmount: 100, risk: "Low", color: "#10B981" },
  { id: "p8", name: "Sterling Growth", currency: "GBP", roi: "11.5% p.a.", duration: "6 months", minAmount: 500, risk: "Medium", color: "#3B82F6" },
  { id: "p9", name: "Sterling Elite", currency: "GBP", roi: "17% p.a.", duration: "12 months", minAmount: 1000, risk: "High", color: "#8B5CF6" },
];

export const MOCK_ACTIVE_INVESTMENTS: ActiveInvestment[] = [
  { id: "ai1", planName: "USD Stable Growth", currency: "USD", amount: 200, roi: "8% p.a.", startDate: "2024-01-10", maturityDate: "2024-04-10", progress: 65, projectedReturn: 4.0 },
  { id: "ai2", planName: "Euro Plus", currency: "EUR", amount: 500, roi: "11% p.a.", startDate: "2024-02-01", maturityDate: "2024-08-01", progress: 25, projectedReturn: 27.5 },
];

export const MOCK_EXCHANGE_RATES: ExchangeRate[] = [
  { from: "USD", to: "EUR", rate: 0.9218, change: -0.12 },
  { from: "USD", to: "GBP", rate: 0.7923, change: 0.08 },
  { from: "USD", to: "NGN", rate: 1601.45, change: -2.10 },
  { from: "USD", to: "AED", rate: 3.6725, change: 0.00 },
  { from: "EUR", to: "USD", rate: 1.0847, change: 0.13 },
  { from: "EUR", to: "GBP", rate: 0.8595, change: -0.05 },
  { from: "EUR", to: "NGN", rate: 1737.22, change: -1.90 },
  { from: "GBP", to: "USD", rate: 1.2622, change: 0.09 },
];
