import type { FC } from 'react';
import Link from 'next/link';
import MagneticButton from '../ui/magic-button'; 

const Navbar: FC = () => {
  return (
    <header className="w-full items-center justify-center cursor-none  fixed  z-30">
      
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between  p-2 rounded-xl z-30"
        aria-label="Global"
      >
        {/* Brand Name */}
        <div className="flex-shrink-0">
          <Link href="/" passHref>
            <MagneticButton
              className="text-2xl font-bold text-neutral-300 rounded-lg px-2 py-2 cursor-none z-999"
              data-cursor-target="true"
            >
            VELRU
            </MagneticButton>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-x-12 z-50">
          <Link href="#" passHref>
            <MagneticButton
              className="text-xl font-normal text-neutral-300 rounded-xl cursor-none z-50"
              data-cursor-target="true"
            >
              <div className='bg-transparent rounded-xl py-2 px-5 text-center'>
                Log in
              </div>
            </MagneticButton>
          </Link>
          <Link href="#" passHref>
            <MagneticButton
              className=" text-xl font-normal text-neutral-300 rounded-xl cursor-none"
              data-cursor-target="true"
            >
              <div className='bg-transparent  rounded-xl py-2 px-5 text-center'>
                Pricing
              </div>
              
            </MagneticButton>
          </Link>
          <Link href="#" passHref>
            <MagneticButton
              className=" text-xl font-normal text-neutral-300 rounded-xl cursor-none"
              data-cursor-target="true"
            >
              <div className='bg-transparent  rounded-xl py-2 px-5 text-center flex flex-row gap-1'>
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
