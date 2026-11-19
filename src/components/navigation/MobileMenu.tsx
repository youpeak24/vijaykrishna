import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { filmmaker } from '../../data/filmmaker';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, ImdbIcon } from '../ui/SocialIcons';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Filmography', href: '/filmography' },
  { label: 'Production', href: '/production' },
  { label: 'Creative Vision', href: '/creative-vision' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Press & Awards', href: '/press-awards' },
  { label: 'Contact', href: '/contact' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-cinemaBlack flex flex-col"
        >
          {/* Background decorative gradient */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                'radial-gradient(ellipse at top right, #8B5CF6 0%, transparent 60%), radial-gradient(ellipse at bottom left, #FF304F 0%, transparent 60%)',
            }}
          />

          {/* Top header with Logo & Close button */}
          <div className="relative z-10 container-wide flex items-center justify-between py-6 border-b border-ivory/10">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/40 shadow-[0_0_12px_rgba(233,185,110,0.25)] shrink-0">
                <img
                  src="/logo/apple-touch-icon.png"
                  alt={filmmaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg text-ivory tracking-wider leading-none">
                  VIJAY KRISHNAN
                </span>
                <span className="font-caption text-[9px] text-silver/70 tracking-[0.22em] uppercase leading-tight mt-0.5">
                  FILMMAKER
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-2 text-silver hover:text-ivory transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <div className="relative z-10 flex-1 flex items-center container-wide">
            <ul className="space-y-2 w-full">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="block font-display text-5xl md:text-6xl text-ivory/80 hover:text-ivory hover:translate-x-4 transition-all duration-300"
                    style={{ lineHeight: 1.1 }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Footer info */}
          <div className="relative z-10 container-wide pb-10">
            <div className="border-t border-ivory/10 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="font-caption text-silver italic text-sm">
                "{filmmaker.philosophy}"
              </p>
              <div className="flex items-center gap-4">
                <a href={filmmaker.social.instagram} target="_blank" rel="noopener noreferrer" className="text-silver hover:text-ivory transition-colors">
                  <InstagramIcon size={18} />
                </a>
                <a href={filmmaker.social.youtube} target="_blank" rel="noopener noreferrer" className="text-silver hover:text-ivory transition-colors">
                  <YoutubeIcon size={18} />
                </a>
                <a href={filmmaker.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-silver hover:text-ivory transition-colors">
                  <LinkedinIcon size={18} />
                </a>
                <a href={filmmaker.social.imdb} target="_blank" rel="noopener noreferrer" className="text-silver hover:text-ivory transition-colors">
                  <ImdbIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
