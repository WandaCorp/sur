/**
 * Evita mismatches de hidratación al leer localStorage (favoritos, ajustes).
 */
import { useEffect, useState } from "react";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
