import type { FC } from 'react';
import Link from 'next/link';
import MagneticButton from '../ui/magic-button'; // Adjust import path if needed

const Navbar: FC = () => {
  return (
    <header className="sticky top-0 h-20 flex items-center z-50">
      <nav
        className="w-full flex items-center justify-between mx-auto max-w-7xl"
        aria-label="Global"
      >
        {/* Brand Name */}
        <div className="flex-shrink-0">
          <Link href="/" passHref>
            <MagneticButton
              className="text-2xl font-bold text-neutral-100 hover:text-black rounded-lg px-2 py-2 cursor-none"
              data-cursor-target="true"
            >
              velru
            </MagneticButton>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-x-10">
          <Link href="#" passHref>
            <MagneticButton
              className=" text-sm font-semibold text-neutral-100 hover:text-black rounded-full cursor-none"
              data-cursor-target="true"
            >
              <div className='bg-red-500  rounded-full py-3 px-6 text-center'>
                Log in
              </div>
            </MagneticButton>
          </Link>
          <Link href="#" passHref>
            <MagneticButton
              className="px-4 py-2 text-sm font-semibold text-neutral-100 hover:text-black rounded-full cursor-none"
              data-cursor-target="true"
            >
              <div className='bg-red-500  rounded-full py-3 px-6 text-center'>
                Pricing
              </div>
              
            </MagneticButton>
          </Link>
          <Link href="#" passHref>
            <MagneticButton
              className="px-4 py-2 text-sm font-semibold text-white rounded-full cursor-none"
              data-cursor-target="true"
            >
              <div className='bg-red-500  rounded-full py-3 px-6 text-center'>
                Sign up
              </div>
              
            </MagneticButton>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
