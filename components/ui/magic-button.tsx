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
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    const newPosition = { x, y };
    setPosition(newPosition);

    // Dispatch the custom event with the position offset
    window.dispatchEvent(
      new CustomEvent("magnetic-move", { detail: { position: newPosition } })
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
        transition={{ type: "spring", damping: 25, stiffness: 150, mass:  0.01 }}
        style={{ zIndex: 50 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
