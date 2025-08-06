'use client';

import React, { type FC } from 'react';
import { motion } from 'framer-motion';
import type { HeroContentItem } from '@/lib/types';
import Image from 'next/image';

const RightScrollList: FC<{ items: HeroContentItem[]; activeItemId: string }> = ({ items, activeItemId }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  // Find the full data object for the currently active item
  const activeItem = items.find(item => item.id === activeItemId);

  return (
    <div className="relative ">
      <div className="h-[30vh]" />
      <div className="relative">
        {items.map((item) => {
          const isActive = item.id === activeItemId;
          return (
            <div
              key={item.id}
              data-id={item.id}
              
              onClick={handleClick}
              // The main card container with fixed height, overflow hidden, and new z-index.
              className="my-8 rounded-2xl relative cursor-none h-72 overflow-hidden z-0"
              style={{ scrollSnapAlign: 'center' }}
            >
              {/* The snapping highlighter now acts as the card's background */}
              {isActive && activeItem && (
                <motion.div
                  layoutId="highlighter"
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: activeItem.highlighterColor }}
                  transition={{
                    type: 'spring',
                    stiffness: 1150,
                    damping: 20,
                    mass: 1,
                  }}
                />
              )}
              
              {/* Card Content Container */}
              <div
                className={`relative flex h-full items-center transition-colors duration-100 rounded-2xl ${
                  !isActive && 'bg-white shadow-sm'
                }`}
              >
                {/* Left side: Text content (always 60% width) */}
                <div className="w-3/5 h-full flex flex-col justify-center p-8">
                  <h3
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-800'
                    }`}
                  >
                    {item.listItemHeadline}
                  </h3>
                </div>

                {/* Right side: Image content (always visible, 40% width) */}
                <div className="w-2/5 h-full relative">
                  <Image
                    src={item.listItemImage}
                    alt={item.listItemHeadline}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[30vh]" />
    </div>
  );
};

export default RightScrollList;
