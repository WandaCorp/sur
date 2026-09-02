/**
 * Interruptor accesible (Radix) para ajustes y contenido adulto.
 */
import type { ComponentProps } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors",
        "data-[state=checked]:bg-gold data-[state=unchecked]:bg-elevated",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-fg shadow-sm transition-transform",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
          "data-[state=checked]:bg-gold-fg",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
