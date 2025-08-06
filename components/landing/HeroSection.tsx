'use client';

import React, { useState, useEffect, useRef, type FC } from 'react';
import LeftStickyBox from './left-sticky-box';
import RightScrollList from './right-scroll-list';
import type { HeroContentItem } from '@/lib/types';
import Navbar from '@/components/layout/navbar';

interface HeroSectionProps {
  data: HeroContentItem[];
}

const HeroSection: FC<HeroSectionProps> = ({ data }) => {
  const [activeItem, setActiveItem] = useState<HeroContentItem>(data[0]);
  // This ref now points to the container of the right-hand list items
  const listContainerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const listElement = listContainerRef.current;
    if (!listElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const intersectedId = entry.target.getAttribute('data-id');
            const newActiveItem = data.find((item) => item.id === intersectedId);
            if (newActiveItem) {
              setActiveItem(newActiveItem);
            }
          }
        });
      },
      {
        // root is now `null`, which means the observer will use the browser's
        // viewport as the scroll area.
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Triggers when an item is in the vertical center
        threshold: 0,
      }
    );

    const listItems = listElement.querySelectorAll('[data-id]');
    listItems.forEach((item) => observer.observe(item));

    return () => listItems.forEach((item) => observer.unobserve(item));
  }, [data]);

  return (

        <div className="relative flex flex-row ">
          
          {/* Left Panel: It's now sticky within the main document flow */}
          <div className="w-full md:w-1/2">
            <div className="md:sticky top-0 flex h-screen items-center">
              <LeftStickyBox content={activeItem.expandedContent} />
            </div>
          </div>
          <div ref={listContainerRef} className="w-full md:w-1/2 ">
            <RightScrollList items={data} activeItemId={activeItem.id} />
       
        </div>
        </div>
      
    
  );
};

export default HeroSection;