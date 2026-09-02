/**
 * Utilidades de clase CSS.
 * Combina clsx + tailwind-merge para fusionar clases de Tailwind sin conflictos.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Indica si el código corre en el navegador (evita leer localStorage en SSR). */
export function isBrowser() {
  return typeof window !== "undefined";
}
