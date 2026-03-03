export const getCurrencySymbol = (code: string): string => {
  const symbols: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", NGN: "₦", AED: "د.إ",
    JPY: "¥", CAD: "C$", CHF: "Fr", AUD: "A$", CNY: "¥",
    INR: "₹", ZAR: "R", GHS: "₵", KES: "KSh", EGP: "£",
    BRL: "R$", MXN: "$", SGD: "S$", HKD: "HK$", SEK: "kr",
  };
  return symbols[code] || code;
};

export const getCurrencyFlag = (code: string): string => {
  const flags: Record<string, string> = {
    USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", NGN: "🇳🇬", AED: "🇦🇪",
    JPY: "🇯🇵", CAD: "🇨🇦", CHF: "🇨🇭", AUD: "🇦🇺", CNY: "🇨🇳",
    INR: "🇮🇳", ZAR: "🇿🇦", GHS: "🇬🇭", KES: "🇰🇪", EGP: "🇪🇬",
    BRL: "🇧🇷", MXN: "🇲🇽", SGD: "🇸🇬", HKD: "🇭🇰", SEK: "🇸🇪",
  };
  return flags[code] || "🌍";
};

export const getCurrencyColor = (code: string): string => {
  const colors: Record<string, string> = {
    USD: "#10B981", EUR: "#C9A84C", GBP: "#8B5CF6",
    NGN: "#3B82F6", AED: "#F59E0B", JPY: "#EF4444",
    CAD: "#EC4899", CHF: "#06B6D4", AUD: "#F97316", CNY: "#EF4444",
  };
  return colors[code] || "#64748B";
};
