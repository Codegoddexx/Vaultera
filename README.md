# Vaultera
Multi-currency wallet, converter &amp; investment platform. 

<div align="center">

# ✦ VAULTERA

### *The New Era of Money Movement.*

**Convert. Hold. Send. Invest. In any of 180 world currencies.**

[![Live Demo](https://img.shields.io/badge/🌍_Live_Demo-Vaultera-F59E0B?style=for-the-badge)](https://vaultera.com)
[![Status](https://img.shields.io/badge/Status-In_Development-8B5CF6?style=for-the-badge)]()
[![Next.js](https://img.shields.io/badge/Next.js_14-App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3B82F6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)]()

---

*Built by a Nigerian girl who tried to convert Euros to Dollars — and couldn't.*

---

</div>

## ✦ The Story Behind Vaultera

This didn't start in a boardroom. It started with a problem.

My mum handed me some Euros in cash and asked me to help her invest them. Simple, right? Except when I opened every platform I knew — there was no direct Euro to Dollar conversion. No Euro investment plans. Even **Eurobonds are denominated in Dollars**. The process was confusing, fragmented, and broken for anyone living between currencies.

I'm Nigerian. I think in Naira, earn in Dollars, save in Euros, and sometimes deal in Dirhams. And I realised — **this isn't just my problem**. It's the problem of every African professional, every diaspora family, every global citizen trying to move money the way the modern world actually works.

So I built Vaultera.

Not just a currency converter. A **full multi-currency financial platform** — where you can hold real balances in USD, EUR, GBP, NGN and AED, convert between any of 180 world currencies at live rates, invest and earn returns in the currency of your choice, and send or receive money across borders without confusion.

**This is the era of borderless wealth. Welcome to Vaultera.**

---

## ✦ What Vaultera Does

| Feature | Description |
|---|---|
| 💱 **Currency Converter** | Convert between all 180 world currencies at live interbank rates |
| 🏦 **Multi-Currency Wallet** | Hold USD, EUR, GBP, NGN, AED — each with its own account number |
| 📈 **Investment Plans** | Earn up to 18% p.a. on USD, EUR & GBP savings plans |
| ↗️ **Send Money** | Send to anyone, anywhere, in any currency |
| ↙️ **Receive Money** | Get paid in any active currency via your account number or QR code |
| 📊 **Live Rates Dashboard** | Track all 180 currency rates in real time, with change indicators |
| 🌍 **180 Currencies** | Every currency on earth — from Naira to Swiss Franc |
| 🔐 **Bank-Grade Security** | 256-bit encryption, 2FA, full KYC verification |

---

## ✦ Built For

> The Nigerian freelancer receiving USD from foreign clients.
> The student in London converting Naira from home to GBP.
> The entrepreneur in Dubai dealing in AED and EUR simultaneously.
> The African diaspora family bridging currencies across continents.
> **Anyone who has ever been confused by cross-currency financial life.**

---

## ✦ Tech Stack

This is built the right way — production-grade, scalable, and ready for real users.

### Frontend
- **Next.js 14** — App Router, Server Components, SEO-optimised
- **TypeScript** — Type-safe, production-ready
- **Tailwind CSS** — Utility-first, fully responsive (mobile-first)
- **Framer Motion** — 3D animations, micro-interactions, parallax
- **Zustand** — Lightweight, fast state management

### Backend *(coming soon)*
- **Next.js API Routes** — Serverless backend built in
- **PostgreSQL** — Relational database for financial data
- **Prisma ORM** — Type-safe database queries
- **Redis** — Exchange rate caching (updated every 30 mins)
- **NextAuth.js** — Secure authentication with KYC hooks

### Integrations *(coming soon)*
- **ExchangeRate-API** — Live rates for all 180 currencies
- **Paystack** — NGN payments (Nigeria-first)
- **Stripe** — USD/EUR/GBP payments
- **Telr** — AED payments (UAE)

### Design Philosophy
- Dark luxury aesthetic — deep navy, warm gold accents
- Futuristic 3D draggable globe on the hero section
- Floating animated currency cards
- Every page is responsive — mobile, tablet, desktop, all at once

---

## ✦ Project Structure

```
vaultera/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/               # Login & Register
│   │   ├── dashboard/          # Main balance dashboard
│   │   ├── convert/            # Currency converter
│   │   ├── wallets/            # Multi-currency wallets
│   │   ├── invest/             # Investment plans
│   │   ├── send/               # Send money
│   │   ├── receive/            # Receive money
│   │   ├── rates/              # Live rates table
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── landing/            # Hero, Navbar, Features, etc.
│   │   ├── layout/             # Sidebar, TopBar, AppShell
│   │   ├── dashboard/          # Balance grid, transactions
│   │   ├── converter/          # Converter form & rate display
│   │   ├── wallet/             # Wallet cards & history
│   │   ├── invest/             # Investment plan cards
│   │   ├── send/ & receive/    # Transfer flows
│   │   ├── rates/              # Rates table
│   │   └── ui/                 # Reusable: Button, Card, Input...
│   ├── lib/                    # Utils, constants, formatters, mock data
│   ├── hooks/                  # useConverter, useWallet, useRates
│   ├── store/                  # Zustand app & theme store
│   ├── types/                  # TypeScript types
│   └── config/                 # Site config
```

---

## ✦ Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- A GitHub Codespace or local environment

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vaultera.git
cd vaultera/vaultera

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in your API keys (see Environment Variables below)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see Vaultera in your browser.

### Environment Variables

Create a `.env.local` file in the root of your project:

```env
# Exchange Rate API
EXCHANGE_RATE_API_KEY=your_key_here
# Get free key at: https://www.exchangerate-api.com

# Authentication
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_postgres_url_here

# Payments - Nigeria
PAYSTACK_SECRET_KEY=your_key_here
# Get at: https://paystack.com

# Payments - International
STRIPE_SECRET_KEY=your_key_here
# Get at: https://stripe.com

# Payments - UAE
TELR_API_KEY=your_key_here
```

---

## ✦ Roadmap

### Phase 1 — MVP *(current)*
- [x] Project scaffold & folder structure
- [x] TypeScript types & mock data
- [x] UI component library (Button, Card, Input, Modal...)
- [x] Landing page with 3D draggable globe
- [x] App layout (Sidebar, TopBar)
- [ ] All app pages (Dashboard, Converter, Wallets, Invest, Send, Receive, Rates)
- [ ] Auth pages (Login, Register)

### Phase 2 — Live Data
- [ ] Exchange Rate API integration (live rates)
- [ ] PostgreSQL + Prisma database setup
- [ ] NextAuth authentication + KYC flow
- [ ] Real wallet balance management

### Phase 3 — Payments
- [ ] Paystack integration (NGN)
- [ ] Stripe integration (USD/EUR/GBP)
- [ ] Real send & receive flows
- [ ] Transaction history

### Phase 4 — Investments
- [ ] Investment plan engine
- [ ] ROI calculation & maturity tracking
- [ ] Email notifications

### Phase 5 — Scale
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Referral system
- [ ] Business accounts

---

## ✦ Live Demo

> 🚀 **Deployed at:** [your-link-here] *(coming soon)*

---

## ✦ Screenshots

> *Screenshots coming as the app develops*

---

## ✦ The Name

**Vaultera** = *Vault* + *Era*

A vault is where the most precious things are kept — your wealth, protected and growing.
An era is a new chapter — because we're not just building an app, we're starting a new way of thinking about money across borders.

*Vaultera: The era of vaulted wealth.*

---

## ✦ About the Builder

Built by **Adaeze** — Nigerian developer, problem solver, and someone who once couldn't convert Euros to Dollars and decided to build the solution herself.

> *"I didn't find the platform I needed. So I built it."*

---

## ✦ Contributing

Vaultera is currently in active development. Contributions, feedback and ideas are welcome.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## ✦ License

Proprietary — © 2025 Vaultera. All rights reserved.

---

<div align="center">

**Built with 💛 for the borderless generation.**

*Lagos · London · Dubai · New York · Everywhere*

[![Twitter](https://img.shields.io/badge/Twitter-@vaultera-1DA1F2?style=flat-square&logo=twitter)](https://twitter.com/vaultera)
[![Instagram](https://img.shields.io/badge/Instagram-@vaultera-E4405F?style=flat-square&logo=instagram)](https://instagram.com/vaultera)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vaultera-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/company/vaultera)

---

*"Your wealth. Every currency. One era."*

</div>

