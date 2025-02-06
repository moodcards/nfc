import type React from "react"
import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function Loader({ size = "md", className, ...props }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        size === "sm" && "scale-75",
        size === "md" && "scale-100",
        size === "lg" && "scale-125",
        className,
      )}
      {...props}
    >
      <div className="relative w-16 h-16">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-primary opacity-20 rounded-full"></div>

        {/* Spinning arc */}
        <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>

        {/* Pulsing inner circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
        </div>

        {/* Orbiting dot */}
        <div className="absolute inset-0">
          <div className="w-2 h-2 bg-primary rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit"></div>
        </div>
      </div>
    </div>
  )
}

