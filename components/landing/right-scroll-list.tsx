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

  return (
    <div className="relative ">
      <div className="h-[40vh]" />
      <div className="relative">
        {items.map((item) => {
          const isActive = item.id === activeItemId;
          return (
            <div
              key={item.id}
              data-id={item.id}
              data-cursor-target="true"
              onClick={handleClick}
              // The main container for the card
              className="my-8 rounded-2xl relative cursor-none"
              style={{ scrollSnapAlign: 'center', zIndex:50}}
            >
              {/* The snapping highlighter now acts as the card's background */}
              {isActive && (
                <motion.div
                  layoutId="highlighter"
                  className="absolute inset-0 bg-neutral-800 rounded-xl"
                  transition={{
                    type: 'spring',
                    stiffness: 1150,
                    damping: 25,
                    mass: 1,
                  }}
                />
              )}
              
              {/* Card Content Container */}
              {/* We use flexbox to position the text and image */}
              <div
                className={`relative flex justify-between px-4 py-4 transition-colors duration-100 rounded-2xl ${
                  !isActive && 'bg-transparent '
                }`}
              >
                {/* Left side: Text content */}
                <div className="max-w-md">
                  <h3
                    className={`text-3xl font-bold transition-colors duration-300 text-neutral-300 `}
                  >
                    {item.listItemHeadline}
                  </h3>
                </div>

                {/* Right side: Image content */}
                <div className="flex-shrink-0 w-40 h-40 relative rounded-md overflow-hidden ml-0">
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
      <div className="h-[40vh]" />
    </div>
  );
};

export default RightScrollList;
