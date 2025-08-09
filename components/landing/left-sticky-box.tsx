import type { FC } from 'react';
import type { HeroContentItem } from '@/lib/types';
import MagneticButton from '../ui/magic-button'; // Adjust import path if needed
import Link from 'next/link';

interface LeftStickyBoxProps {
  content: HeroContentItem['expandedContent'];
}

const LeftStickyBox: FC<LeftStickyBoxProps> = ({ content }) => {
  return (
    // Main container with a fixed aspect ratio and overflow hidden for the video
    <div className="relative w-full max-w-xl h-[80vh] rounded-4xl overflow-hidden border-[0.5px] border-white/40">
      {/* Background Video */}
      <video
        // The key is crucial for replaying the video on source change.
        key={content.video}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src={content.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Gradient overlay with varying opacity and blur effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-white/5" />
        {/* if blur needed for more visibility */}
        {/* <div className="absolute inset-0 backdrop-blur-xl bg-transparent [mask-image:linear-gradient(to_bottom,black,transparent)]" /> */}
      </div>

      {/* Content Container */}
      {/* This div uses flex-col and justify-between to push content to the top and bottom */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-12">
        {/* Top Section: Headline and Problem */}
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white ">
            {content.solutionHeadline}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-sans">
            {content.problemHeadline}
          </p>
        </div>

        {/* Bottom Section: Solution and CTAs */}
        <div className="z-50">
          <p className="text-gray-200 mb-6 font-sans">{content.solutionDescription}</p>
          <div className="flex items-center gap-x-8">
            <Link href="#" passHref>
              <MagneticButton
                className='rounded-3xl '
                data-cursor-target="true"
              >
                <div className="px-6 py-4 text-lg font-light text-black bg-white rounded-3xl cursor-none z-20 hover:bg-blue-800 hover:text-white transition-colors duration-200">
                  {content.cta1}
                </div>
                
              </MagneticButton>
            </Link>
            <Link href="#" passHref>
              <MagneticButton
              className="rounded-3xl"
                data-cursor-target="true"
              >
                <div className="px-6 py-4 text-lg font-light text-white bg-white/10 rounded-3xl cursor-none border border-white/40">
                  {content.cta2}
                </div>
                
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftStickyBox;
