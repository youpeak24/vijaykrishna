import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { filmmaker } from '../../data/filmmaker';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'FILMOGRAPHY', href: '/filmography' },
  { label: 'PRODUCTION', href: '/production' },
  { label: 'CREATIVE VISION', href: '/creative-vision' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'PRESS & AWARDS', href: '/press-awards' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);

    const handleScroll = () => {
      const currentScrolled = window.scrollY > 50;
      if (currentScrolled !== isScrolled) {
        isScrolled = currentScrolled;
        setScrolled(currentScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-cinemaBlack/90 backdrop-blur-md border-b border-ivory/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Monogram */}
            <Link
              to="/"
              className="font-display text-2xl text-ivory hover:text-gold transition-colors duration-300 tracking-widest"
              data-cursor="HOME"
            >
              {filmmaker.monogram}
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`nav-link ${location.pathname === link.href ? 'text-ivory' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gold/50 text-gold font-body font-semibold text-xs tracking-widest uppercase hover:bg-gold hover:text-cinemaBlack transition-all duration-300"
              >
                LET'S COLLABORATE
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 p-2 group"
                aria-label="Open menu"
              >
                <span className="block w-6 h-px bg-ivory group-hover:bg-gold transition-colors duration-300" />
                <span className="block w-4 h-px bg-ivory group-hover:bg-gold transition-colors duration-300" />
                <span className="block w-6 h-px bg-ivory group-hover:bg-gold transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;
