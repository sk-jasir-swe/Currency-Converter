import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      const urls = [
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
        `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`,
      ];

      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          const result = await response.json();
          if (!cancelled) setData(result[currency] ?? {});
          return;
        } catch {
          // Try the fallback URL.
        }
      }

      if (!cancelled) setData({});
    }

    loadRates().catch((error) => {
      console.error(error);
      if (!cancelled) setData({});
    });

    return () => {
      cancelled = true;
    };
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
