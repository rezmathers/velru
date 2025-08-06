import type { FC } from 'react';
import Link from 'next/link';

const Navbar: FC = () => {
  return (
    // This header is also sticky and sits on top of the background.
    // Its high z-index ensures the buttons are clickable.
    <header className="sticky top-0 h-20 flex items-center z-50">
      <nav
        className="w-full flex items-center justify-between mx-auto max-w-7xl "
        aria-label="Global"
      >
        {/* Brand Name */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-bold text-neutral-100 hover:text-black rounded-lg px-2 py-2"
            data-cursor-target="true"
          >
            velru
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-x-2">
          <a
            href="#"
            className="px-4 py-2 text-sm font-semibold text-neutral-100 hover:text-black rounded-md"
            data-cursor-target="true"
          >
            Log in
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-semibold text-neutral-100 hover:text-black rounded-md"
            data-cursor-target="true"
          >
            Pricing
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-semibold text-white  bg-black rounded-md"
            data-cursor-target="true"
          >
            Sign up
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;