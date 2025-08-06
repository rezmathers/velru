'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// This component wraps your page content to provide smooth scrolling.
const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Adjust this value for more or less "springiness"
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // The animation loop that updates Lenis on every frame
    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    const animationFrameId = requestAnimationFrame(animate);

    // Cleanup function to destroy Lenis instance on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
