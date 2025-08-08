"use client";

import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {}

export default function MagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // This is the key change: we multiply the distance by a small fraction (e.g., 0.2)
    // to reduce the amount the content moves. This creates the "wiggle" effect.
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    
    setPosition({ x, y });

    // Dispatch the custom event with the dampened position offset
    window.dispatchEvent(
      new CustomEvent("magnetic-move", { detail: { position: { x, y } } })
    );
  };

  const handleMouseLeave = () => {
    const newPosition = { x: 0, y: 0 };
    setPosition(newPosition);
    
    // Dispatch the event on leave to reset the cursor's offset
    window.dispatchEvent(
      new CustomEvent("magnetic-move", { detail: { position: newPosition } })
    );
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* This span contains the button's text. It animates based on the
          magnetic pull and has a high z-index to sit on top of the cursor. */}
      <motion.span
        className="relative block"
        animate={{ x, y }}
        // The transition is slightly adjusted for a snappier feel.
        transition={{ type: "spring", damping: 15, stiffness: 250, mass: 0.1 }}
        style={{ zIndex: 50 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
