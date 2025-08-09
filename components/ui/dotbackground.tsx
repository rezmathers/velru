import { cn } from "@/lib/utils";
import React from "react";

export function DotBackgroundDemo() {
  return (
    <div className="fixed flex h-[100vh] w-full items-center justify-center contrast-150">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#ffffff04_1px,#00000000_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_70%,white)] bg-black/25"></div> */}
      
    </div>
  );
}
