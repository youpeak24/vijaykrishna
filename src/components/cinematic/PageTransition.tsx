import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: 'easeIn' as const },
  },
};

const curtainVariants = {
  initial: { scaleY: 0 },
  enter: { scaleY: 0, transition: { duration: 0.6 } },
  exit: {
    scaleY: 1,
    transition: { duration: 0.4, ease: 'easeIn' as const },
  },
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {/* Curtain overlay */}
        <motion.div
          className="fixed inset-0 z-[9000] bg-cinemaBlack pointer-events-none origin-top"
          variants={curtainVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
