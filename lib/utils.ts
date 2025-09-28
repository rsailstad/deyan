import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, pattern = "MMM d, yyyy") {
  try {
    return format(new Date(iso), pattern);
  } catch (error) {
    console.warn("Invalid date", iso, error);
    return iso;
  }
}
