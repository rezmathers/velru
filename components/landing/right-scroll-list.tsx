// 'use client';

// import React, { FC } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import type { HeroContentItem } from '@/lib/types';
// import Image from 'next/image';

// // A sub-component to handle the logic for a single card
// const ListItemCard: FC<{ item: HeroContentItem; isActive: boolean; onClick: (e: React.MouseEvent<HTMLDivElement>) => void }> = ({ item, isActive, onClick }) => {
//   return (
//     <div
//       key={item.id}
//       data-id={item.id}
//       onClick={onClick}
//       className="my-8 rounded-2xl relative cursor-none h-48 overflow-visible"
//       style={{ scrollSnapAlign: 'center' }}
//     >
//       {/* The snapping highlighter background */}
//       {isActive && (
//         <motion.div
//           layoutId="highlighter"
//           className="absolute inset-0 rounded-xl"
//           style={{ background: item.highlighterColor }}
//           transition={{
//             type: 'spring',
//             stiffness: 1150,
//             damping: 20,
//             mass: 1,
//           }}
//         />
//       )}
      
//       {/* Card Content Container */}
//       <div
//         className={`relative flex h-full items-center transition-colors duration-100 rounded-2xl ${
//           !isActive && 'bg-transparent'
//         }`}
//       >
//         {/* Left side: Text content, now animated with Framer Motion */}
//         <motion.div
//           // We use Framer Motion's animate prop for the width change
//           animate={{ width: isActive ? '60%' : '100%' }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           className="h-full flex flex-col justify-center p-8"
//         >
//           {/* The `layout` prop is the key to the smooth text reflow animation */}
//           <motion.h3
//             layout
//             className={`text-3xl font-light transition-colors duration-300 ${
//               isActive ? 'text-white' : 'text-neutral-800'
//             }`}
//           >
//             {item.listItemHeadline}
//           </motion.h3>
//         </motion.div>

//         {/* Right side: Image content (with opacity animation) */}
//         <AnimatePresence>
//           {isActive && (
//             <motion.div
//               className="w-2/5 h-full relative"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.4, ease: 'easeInOut' }}
//             >
//               <Image
//                 src={item.listItemImage}
//                 alt={item.listItemHeadline}
//                 fill
//                 className="object-cover overflow-visible"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };


// const RightScrollList: FC<{ items: HeroContentItem[]; activeItemId: string }> = ({ items, activeItemId }) => {
//   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     e.currentTarget.scrollIntoView({
//       behavior: 'smooth',
//       block: 'center',
//     });
//   };

//   return (
//     <div className="relative ">
//       <div className="h-[30vh]" />
//       <div className="relative">
//         {items.map((item) => (
//           <ListItemCard
//             key={item.id}
//             item={item}
//             isActive={item.id === activeItemId}
//             onClick={handleClick}
//           />
//         ))}
//       </div>
//       <div className="h-[30vh]" />
//     </div>
//   );
// };

// export default RightScrollList;


'use client';

import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeroContentItem } from '@/lib/types';
import Image from 'next/image';

// A sub-component to handle the logic for a single card
const ListItemCard: FC<{ item: HeroContentItem; isActive: boolean; onClick: (e: React.MouseEvent<HTMLDivElement>) => void }> = ({ item, isActive, onClick }) => {
  return (
    <div
      key={item.id}
      data-id={item.id}
      onClick={onClick}
      className="my-8  relative cursor-none h-48 overflow-visible"
      style={{ scrollSnapAlign: 'center' }}
    >
      {/* The snapping highlighter background */}
      {isActive && (
        <motion.div
          layoutId="highlighter"
          className="absolute inset-0 rounded-4xl overflow-hidden border-[1px] border-white/40" // Added overflow-hidden here
          transition={{
            type: 'spring',
            stiffness: 1150,
            damping: 20,
            mass: 1,
          }}
        >
          {/* The image is now the background of the highlighter */}
          <Image
            src={item.highlighterImage}
            alt={item.listItemHeadline}
            fill
            className="object-cover brightness-50 contrast-150 pointer-events-none blur-xl opacity-50 "
          />
          
          
        </motion.div>
      )}
      
      {/* Card Content Container */}
      <div
        className={`relative flex h-full items-center transition-colors duration-100 rounded-2xl -z-10${
          !isActive && 'bg-transparent'
        }`}
      >
        {/* Left side: Text content, now animated with Framer Motion */}
        <motion.div
          animate={{ width: isActive ? '60%' : '100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full flex flex-col justify-center p-8 "
        >
          <motion.h3
            layout
            className={`text-2xl font-medium  duration-300 ${
              isActive ? 'text-white' : 'text-neutral-600 '
            }`}
          >
            {item.listItemHeadline}
          </motion.h3>
        </motion.div>

        {/* Right side: Image content (with opacity animation) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="w-2/5 h-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <Image
                src={item.listItemImage}
                alt={item.listItemHeadline}
                fill
                className="object-cover overflow-visible pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
};


const RightScrollList: FC<{ items: HeroContentItem[]; activeItemId: string }> = ({ items, activeItemId }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="relative ">
      <div className="h-[30vh]" />
      <div className="relative">
        {items.map((item) => (
          <ListItemCard
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className="h-[30vh]" />
    </div>
  );
};

export default RightScrollList;
