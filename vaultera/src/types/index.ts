export type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  color: string;
};

export type Wallet = {
  id: string;
  currency: string;
  balance: number;
  accountNumber: string;
  change: number;
};

export type Transaction = {
  id: string;
  type: "send" | "receive" | "convert" | "invest";
  currency: string;
  amount: number;
  from: string;
  to?: string;
  note?: string;
  date: string;
  status: "completed" | "pending" | "active" | "failed";
};

export type InvestmentPlan = {
  id: string;
  name: string;
  currency: string;
  roi: string;
  duration: string;
  minAmount: number;
  risk: "Low" | "Medium" | "High";
  color: string;
};

export type ActiveInvestment = {
  id: string;
  planName: string;
  currency: string;
  amount: number;
  roi: string;
  startDate: string;
  maturityDate: string;
  progress: number;
  projectedReturn: number;
};

export type ExchangeRate = {
  from: string;
  to: string;
  rate: number;
  change: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  kycVerified: boolean;
  tier: "Free" | "Premium" | "Business";
  avatar?: string;
};
