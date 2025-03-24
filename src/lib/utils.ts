import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const sanitize = (inputString: string) => {
  const cleanData = inputString.replace(/</g, "&lt;");
  return cleanData;
}