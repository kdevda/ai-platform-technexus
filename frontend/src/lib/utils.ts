import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind's merge utility.
 * Useful for combining conditional classes with custom classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 