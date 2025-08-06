import type { FC } from 'react';
import type { HeroContentItem } from '@/lib/types';

interface LeftStickyBoxProps {
  content: HeroContentItem['expandedContent'];
}

const LeftStickyBox: FC<LeftStickyBoxProps> = ({ content }) => {
  return (
    // This is the main container. It's positioned relatively to contain the
    // absolute background, and its height is determined by the content inside.
    <div className="relative max-w-xl rounded-2xl min-h-3/4 overflow-hidden">
      {/* Background Image & Overlay */}
      {/* This div is absolutely positioned to fill its parent container.
          We use a key to trigger a fade transition on change.
      */}
      <div
        key={content.image}
        className="absolute inset-0 bg-cover bg-center animate-fade-in-up -z-10"
        style={{ backgroundImage: `url(${content.image})` }}
      >
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      {/* This content is positioned relatively so it sits on top of the background.
          Its padding and text define the overall size of the component.
      */}
      <div className="relative -z-10 p-8 md:p-12 ">
        <h1 className="text-4xl md:text-5xl font-medium mb-4 text-white">
          Your Business Challenges, Solved.
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          The AI-Powered TaaS Platform for On-Demand C-Suite Expertise.
        </p>
        
        {/* Glassmorphism container for the specific problem/solution text */}
        
          <h2 className="text-xl font-semibold mb-3 text-gray-300">Problem</h2>
          <p className="mb-6 text-gray-200">{content.problem}</p>
          <h2 className="text-xl font-semibold mb-3 text-white">
            Solution: {content.solutionHeadline}
          </h2>
          <p className="text-gray-200">{content.solutionDescription}</p>
        
      </div>
    </div>
  );
};

export default LeftStickyBox;