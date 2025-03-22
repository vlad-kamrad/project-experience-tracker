import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupBy<T, K extends keyof any>(
  array: T[],
  keyGetter: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, currentItem) => {
    const key = keyGetter(currentItem);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(currentItem);

    return result;
  }, {} as Record<K, T[]>);
}

export function getRandomUuid() {
  return window.crypto.randomUUID();
}
