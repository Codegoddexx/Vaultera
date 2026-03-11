import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
// import type { PrismaClient } from "@prisma/client";

function generateAccountNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${timestamp}${random}`;
}

async function createWalletWithUniqueAccount(tx: Prisma.TransactionClient, userId: string, currency: string) {
  let created = false;

  while (!created) {
    try {
      const accountNumber = generateAccountNumber();

      await tx.wallet.create({
        data: {
          userId,
          currency,
          balance: 0,
          accountNumber,
        },
      });

      created = true;

    } catch (err: any) {
      if (err.code === "P2002") {
        // unique constraint collision → retry
        continue;
      }
      throw err;
    }
  }
}

const DEFAULT_CURRENCIES = ["USD", "EUR", "GBP", "NGN"];

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user + default wallets in one transaction
    const user = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      for (const currency of DEFAULT_CURRENCIES) {
        const result = await tx.$queryRaw<{ account_number: string }[]>`
      SELECT LPAD(nextval('account_number_seq')::text, 10, '0') as account_number
    `;

        const accountNumber = result[0].account_number;

        await tx.wallet.create({
          data: {
            userId: newUser.id,
            currency,
            balance: 0,
            accountNumber,
          },
        });
      }

      return newUser;
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      userId: user.id,
    });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
