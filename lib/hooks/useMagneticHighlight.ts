import { useState, useCallback } from 'react';
import { useSpring } from '@react-spring/web';

// This hook manages the state and animations for a magnetic element.
export const useMagneticHighlight = () => {
  // `api` is used to imperatively start the spring animations
  const [{ xy, scale }, api] = useSpring(() => ({
    xy: [0, 0], // The [x, y] translation of the element
    scale: [1, 1], // The [x, y] scale of the element
    config: { mass: 0.1, tension: 250, friction: 15 }, // Spring physics
  }));

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!e.currentTarget) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Update the spring with the new magnetic position
      api.start({ xy: [x * 0.3, y * 0.3] }); // Move less than the cursor for a "heavy" feel
    },
    [api]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    // When entering, scale up for the "latching" effect
    api.start({ scale: [1.05, 1.05] });
  }, [api]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // On leave, reset position and scale to normal
    api.start({ xy: [0, 0], scale: [1, 1] });
  }, [api]);
  
  // Return the animated values and the event handlers to be spread onto the component
  return {
    animatedStyle: {
      transform: xy.to((x, y) => `translate3d(${x}px, ${y}px, 0)`),
      scale: scale.to((x, y) => `${x}, ${y}`),
    },
    bind: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    isHovering,
  };
};