"use client";

import { motion, useAnimate, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface MagicCursorProps {
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
  };
  padding?: number;
}

export function MagicCursor({
  springConfig = { damping: 30, stiffness: 500, mass: 1 },
  padding = 1,
}: MagicCursorProps) {
  const [scope, animate] = useAnimate();
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);
  const targetRectRef = useRef<DOMRect | null>(null);

  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  // This effect listens for the custom event from the magnetic button
  // and applies the magnetic pull to the cursor's position.
  useEffect(() => {
    const handleMagneticMove = (event: Event) => {
      if (isHoveringTarget && targetRectRef.current) {
        const { position } = (event as CustomEvent).detail;
        const initialRect = targetRectRef.current;
        
        const newCenterX = initialRect.x + initialRect.width / 2 + position.x;
        const newCenterY = initialRect.y + initialRect.height / 2 + position.y;
        
        cursorX.set(newCenterX);
        cursorY.set(newCenterY);
      }
    };

    window.addEventListener("magnetic-move", handleMagneticMove);
    return () => {
      window.removeEventListener("magnetic-move", handleMagneticMove);
    };
  }, [isHoveringTarget, cursorX, cursorY]);

  // This effect handles the main cursor logic
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      setIsHoveringTarget(true);
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      targetRectRef.current = rect;
      
      // Animate the cursor's shape to match the target
      animate(
        scope.current,
        {
          width: rect.width + padding,
          height: rect.height + padding,
          borderRadius: window.getComputedStyle(target).borderRadius,
          // --- THIS IS THE KEY CHANGE ---
          // Decrease opacity when latched on
          opacity: 0.2,
        },
        { type: "spring", ...springConfig }
      );
    };

    const handleMouseLeave = () => {
      setIsHoveringTarget(false);
      targetRectRef.current = null;
      animate(
        scope.current,
        {
          width: 24,
          height: 24,
          borderRadius: "50%",
          // --- THIS IS THE KEY CHANGE ---
          // Restore opacity when leaving
          opacity: 0.5,
        },
        { type: "spring", ...springConfig }
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only move the cursor freely when not hovering over a target
      if (!isHoveringTarget) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const targets = document.querySelectorAll("[data-cursor-target='true']");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnter as EventListener);
      target.addEventListener("mouseleave", handleMouseLeave as EventListener);
    });
    
    window.addEventListener("mousemove", handleMouseMove);
    document.body.style.cursor = "none";

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        target.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      });
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, [animate, padding, springConfig, cursorX, cursorY, isHoveringTarget]);

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
        backgroundColor: "white",
        opacity: 0.5,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 20,
        willChange: "transform, width, height, border-radius , opacity",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
    />
  );
}
