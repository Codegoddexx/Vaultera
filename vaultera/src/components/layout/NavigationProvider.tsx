"use client";
// import { useEffect, useState, useRef } from "react";
// import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  // Route-change loader DISABLED — bad UX on every navigation
  // To re-enable: uncomment everything and add back useEffect

  // const pathname = usePathname();
  // const [loading, setLoading] = useState(false);
  // const prevPath = useRef(pathname);
  // const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // useEffect(() => {
  //   if (prevPath.current !== pathname) {
  //     setLoading(true);
  //     prevPath.current = pathname;
  //     timerRef.current = setTimeout(() => setLoading(false), 800);
  //   }
  //   return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // }, [pathname]);

  return (
    <>
      {/* PageLoader kept here — triggered manually via usePageLoader() hook below */}
      <PageLoader show={false} />
      {children}
    </>
  );
}
