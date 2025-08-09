"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className="-z-999">
      <div
        className={cn(
          "transition-bg fixed  flex h-[100vh] w-[100vw] flex-col  bg-neutral-950",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          // 1. The new color variables are defined here.
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg, var(--purple-500)_10%, var(--indigo-400)_15%, var(--sky-400)_20%, var(--violet-300)_25%, var(--amber-400)_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
              
              // New Color Palette
              "--purple-500": "#8b5cf6", // Purple
              "--indigo-400": "#818cf8", // Indigo
              "--sky-400": "#38bdf8",   // Light Blue
              "--violet-300": "#c4b5fd", // Violet
              "--amber-400": "#facc15", // Dark Gold

              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              // 2. The gradient is also defined directly in the className. This is the most important part to update.
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[50px] brightness-50 invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--purple-500)_10%,var(--indigo-400)_15%,var(--sky-400)_20%,var(--violet-300)_25%,var(--amber-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        
        {children}
    
       
      </div>
    </main>
  );
};
