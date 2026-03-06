"use client";
import { useState } from "react";

// Use this hook on any button that makes an API call
// const { loading, withLoader } = usePageLoader();
// <PageLoader show={loading} />
// await withLoader(() => myApiCall());

export function usePageLoader() {
  const [loading, setLoading] = useState(false);

  const withLoader = async (fn: () => Promise<void>) => {
    setLoading(true);
    try {
      await fn();
    } finally {
      setLoading(false);
    }
  };

  return { loading, withLoader };
}
