// 'use client';

// import React, { type FC } from 'react';
// import { motion } from 'framer-motion';
// import type { HeroContentItem } from '@/lib/types';
// import Image from 'next/image';

// const RightScrollList: FC<{ items: HeroContentItem[]; activeItemId: string }> = ({ items, activeItemId }) => {
//   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     e.currentTarget.scrollIntoView({
//       behavior: 'smooth',
//       block: 'center',
//     });
//   };

//   return (
//     <div className="relative ">
//       <div className="h-[40vh]" />
//       <div className="relative">
//         {items.map((item) => {
//           const isActive = item.id === activeItemId;
//           return (
//             <div
//               key={item.id}
//               data-id={item.id}
//               data-cursor-target="true"
//               onClick={handleClick}
//               // The main container for the card
//               className="my-8 rounded-2xl relative cursor-none"
//               style={{ scrollSnapAlign: 'center', zIndex:50}}
//             >
//               {/* The snapping highlighter now acts as the card's background */}
//               {isActive && (
//                 <motion.div
//                   layoutId="highlighter"
//                   className="absolute inset-0 bg-neutral-800 rounded-xl"
//                   transition={{
//                     type: 'spring',
//                     stiffness: 1150,
//                     damping: 25,
//                     mass: 1,
//                   }}
//                 />
//               )}
              
//               {/* Card Content Container */}
//               {/* We use flexbox to position the text and image */}
//               <div
//                 className={`relative flex justify-between px-4 py-4 transition-colors duration-100 rounded-2xl ${
//                   !isActive && 'bg-transparent '
//                 }`}
//               >
//                 {/* Left side: Text content */}
//                 <div className="max-w-md">
//                   <h3
//                     className={`text-3xl font-bold transition-colors duration-300 text-neutral-300 `}
//                   >
//                     {item.listItemHeadline}
//                   </h3>
//                 </div>

//                 {/* Right side: Image content */}
//                 <div className="flex-shrink-0 w-40 h-40 relative rounded-md overflow-hidden ml-0">
//                   <Image
//                     src={item.listItemImage}
//                     alt={item.listItemHeadline}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="h-[40vh]" />
//     </div>
//   );
// };

// export default RightScrollList;

'use client';

import React, { type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="relative">
      <div className="h-[40vh]" />
      <div className="relative z-50">
        {items.map((item) => {
          const isActive = item.id === activeItemId;
          return (
            <div
              key={item.id}
              data-id={item.id}
              data-cursor-target="true"
              onClick={handleClick}
              // The main container for the card.
              className={`my-16 aspect-[16/6] max-h-[400px] rounded-2xl relative cursor-none overflow-hidden transition-colors duration-300 ${
                !isActive && 'bg-transparent shadow-sm'
              }`}
              style={{ scrollSnapAlign: 'center' }}
            >
              {/* The image and overlay are now conditionally rendered with a fade animation */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={item.listItemImage}
                      alt={item.listItemHeadline}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out"
                      style={{ transform: 'scale(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-black opacity-50" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The snapping highlighter border still appears on active state */}
              {isActive && (
                <motion.div
                  layoutId="highlighter"
                  className="absolute inset-0 border-2 border-white rounded-2xl"
                  transition={{
                    type: 'spring',
                    stiffness: 1100,
                    damping: 20,
                  }}
                />
              )}
              
              {/* Card Content Container */}
              {/* This div now centers the text vertically */}
              <div className="relative z-10 flex h-full items-center p-6 md:p-8">
                {/* The headline is now constrained to 50% of the card's width */}
                <h3
                  className={`text-3xl md:text-4xl font-bold max-w-[50%] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {item.listItemHeadline}
                </h3>
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
