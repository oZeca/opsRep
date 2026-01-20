import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-card-border bg-surface px-5 py-4 text-base text-foreground transition-smooth file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground-subtle focus-visible:outline-none focus-visible:border-info-border disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
