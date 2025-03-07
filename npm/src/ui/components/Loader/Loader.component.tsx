import React from "react";
import { cn } from "../../utils/style.js";

export function Loader({ className, size = 80 }: { className?: string; size?: number }) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        className={cn("animate-spin rounded-full border-b-6 border-primary ", className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  )
}

