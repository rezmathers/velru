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
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    const newPosition = { x: middleX, y: middleY };
    setPosition(newPosition);

    // FIX: Dispatch a custom event with the button's movement offset
    window.dispatchEvent(
      new CustomEvent("magnetic-move", { detail: { position: newPosition } })
    );
  };

  const handleMouseLeave = () => {
    const newPosition = { x: 0, y: 0 };
    setPosition(newPosition);

    // FIX: Dispatch the event on leave to reset the cursor's offset
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
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 150,
        mass: 0.1,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}