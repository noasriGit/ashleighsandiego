export type ListingType = "buy" | "rent";

export type PriceThreshold = {
  value: string;
  label: string;
  amount?: number;
};

export const LISTING_TYPE_OPTIONS: { value: ListingType; label: string }[] = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
];

/** IDX Broker system property type for sale vs rental searches. */
export function listingTypeToPropertyType(type: ListingType): string | undefined {
  return type === "rent" ? "rnt" : undefined;
}

function formatBuyPrice(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return Number.isInteger(millions) ? `$${millions}M` : `$${millions.toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  return `$${Math.round(amount / 1000)}K`;
}

function formatRentPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}/mo`;
}

const BUY_THRESHOLDS = [
  500_000, 750_000, 1_000_000, 1_250_000, 1_500_000, 2_000_000, 2_500_000, 3_000_000, 5_000_000,
];

const RENT_THRESHOLDS = [1_500, 2_000, 2_500, 3_000, 3_500, 4_000, 5_000, 6_000, 7_500, 10_000];

export function getMinPriceOptions(type: ListingType): PriceThreshold[] {
  const thresholds = type === "rent" ? RENT_THRESHOLDS : BUY_THRESHOLDS;
  const format = type === "rent" ? formatRentPrice : formatBuyPrice;
  return [
    { value: "", label: "No min" },
    ...thresholds.map((amount) => ({
      value: String(amount),
      label: format(amount),
      amount,
    })),
  ];
}

export function getMaxPriceOptions(type: ListingType): PriceThreshold[] {
  const thresholds = type === "rent" ? RENT_THRESHOLDS : BUY_THRESHOLDS;
  const format = type === "rent" ? formatRentPrice : formatBuyPrice;
  return [
    { value: "", label: "No max" },
    ...thresholds.map((amount) => ({
      value: String(amount),
      label: format(amount),
      amount,
    })),
  ];
}

export function resolvePriceAmount(value: string): number | undefined {
  if (!value) return undefined;
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : undefined;
}
