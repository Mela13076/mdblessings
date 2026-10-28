const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Unknown or invalid prices never become invented numeric amounts. */
export function formatStartingPrice(cents: number | null): string {
  if (cents === null || !Number.isSafeInteger(cents) || cents < 0) {
    return "Request a quote";
  }
  return `Starting at ${usd.format(cents / 100)}`;
}
