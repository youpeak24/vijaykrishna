import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.set(containerRef.current, { opacity: 1 })
      .fromTo(
        monogramRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power4.inOut' },
        '+=0.2'
      )
      .fromTo(
        nameRef.current,
        { opacity: 0, letterSpacing: '0.5em' },
        { opacity: 1, letterSpacing: '0.3em', duration: 1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '+=0.1'
      )
      .fromTo(
        sweepRef.current,
        { x: '-100%', opacity: 0.4 },
        { x: '200%', opacity: 0.4, duration: 0.8, ease: 'power2.inOut' },
        '+=0.3'
      )
      .to({}, { duration: 0.4 });

    return () => {
      tl.kill();
    };
  }, [onComplete, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cinemaBlack opacity-0"
    >
      {/* Light sweep */}
      <div
        ref={sweepRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(233,185,110,0.15) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Brand Logo */}
        <div ref={monogramRef} className="opacity-0">
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-gold/60 shadow-[0_0_50px_rgba(233,185,110,0.35)] bg-cinemaBlack">
            <img
              src="/logo/android-chrome-512x512.png"
              alt="Vijay Krishnan Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Gold line */}
        <div
          ref={lineRef}
          className="h-px w-32 origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, #E9B96E, transparent)',
            transform: 'scaleX(0)',
          }}
        />

        {/* Name */}
        <div ref={nameRef} className="opacity-0 text-center">
          <p
            className="font-display text-2xl md:text-3xl text-ivory"
            style={{ letterSpacing: '0.3em' }}
          >
            S VIJAY KRISHNAN
          </p>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="opacity-0 text-center">
          <p
            className="font-caption text-sm text-silver italic"
            style={{ letterSpacing: '0.1em' }}
          >
            Crafting Stories That Live Beyond the Screen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
