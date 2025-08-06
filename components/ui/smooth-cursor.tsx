"use client";

import { motion, useAnimate, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export interface MagicCursorProps {
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
  };
  padding?: number;
}

export function MagicCursor({
  springConfig = { damping: 35, stiffness: 400, mass: 1 },
  padding = 8,
}: MagicCursorProps) {
  const [scope, animate] = useAnimate();
  // We now store a reference to the actual HTML element, not just its position.
  const targetElementRef = useRef<HTMLElement | null>(null);

  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor-target='true']"
      );
      
      const isHoveringTarget = target !== null;
      const wasHoveringTarget = targetElementRef.current !== null;

      if (isHoveringTarget && target !== targetElementRef.current) {
        // Store the element itself in the ref.
        targetElementRef.current = target;
        const rect = target.getBoundingClientRect();
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
        animate(
          scope.current,
          {
            width: rect.width + padding,
            height: rect.height + padding,
            borderRadius: window.getComputedStyle(target).borderRadius,
          },
          { type: "spring", ...springConfig }
        );
      }

      if (!isHoveringTarget && wasHoveringTarget) {
        targetElementRef.current = null;
        animate(
          scope.current,
          { width: 24, height: 24, borderRadius: "50%" },
          { type: "spring", ...springConfig }
        );
      }

      if (!isHoveringTarget) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    // --- NEW EFFECT LOGIC ---
    // This function will run whenever the page is scrolled.
    const handleScroll = () => {
      // If the cursor is currently snapped to a target...
      if (targetElementRef.current) {
        // ...re-calculate that target's position and update the cursor.
        const rect = targetElementRef.current.getBoundingClientRect();
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
      }
    };

    // Add listeners for both mouse movement and scrolling.
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.style.cursor = "none";

    // Cleanup function to remove listeners.
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.cursor = "auto";
    };
  }, [animate, padding, springConfig, cursorX, cursorY]);

  return (
    <motion.div
      ref={scope}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "grey",
        opacity: 0.5,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex:0,
        willChange: "transform, width, height, border-radius",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
    />
  );
}
