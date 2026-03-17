import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
  const isLoggedIn = !!request.auth;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const protectedRoutes = [
    "/dashboard",
    "/convert",
    "/wallets",
    "/invest",
    "/send",
    "/receive",
    "/rates",
  ];

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|assets|globe_faces_currency.gif).*)",
  ],
};