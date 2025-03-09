import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const PAGE_SIZE = 5;

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (
  amount: number,
  locale = "en-US",
  currency = "USD"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
