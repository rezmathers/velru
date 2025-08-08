import HeroSection from '@/components/landing/HeroSection';
import heroData from '../data.json'; // Import the data
import type { HeroContentItem } from '@/lib/types';
import {MagicCursor} from '@/components/ui/smooth-cursor';
import Navbar from '@/components/layout/navbar';

// The data is typed to ensure it matches our interface
const typedHeroData: HeroContentItem[] = heroData;

export default function HomePage() {
  return (
    <main className='max-w-screen-xl mx-auto cursor-none'>
      <Navbar />
      <HeroSection data={typedHeroData} />
      <MagicCursor/>
      <div className='h-2/5 w-full bg-red-200' data-cursor-target="true">
      next section</div>
    </main>
  );
}