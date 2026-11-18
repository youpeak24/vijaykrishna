import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Portrait } from '../../data/portraits';

interface PortraitSliderProps {
  images: Portrait[];
  caption?: string;
  subcaption?: string;
  /** Milliseconds between automatic slides. */
  interval?: number;
}

/**
 * Horizontal sliding photo carousel: autoplay (pauses on hover/focus/hidden tab and is off for
 * reduced-motion users), arrows, dots, keyboard arrows and touch swipe. Only the current slide and
 * its neighbours are animated, so wrapping from the last photo to the first slides forward
 * instead of rewinding through every image.
 */
const PortraitSlider: React.FC<PortraitSliderProps> = ({
  images,
  caption = 'Director on Set',
  subcaption,
  interval = 4500,
}) => {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const touchStart = useRef<number | null>(null);

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [reduced, paused, count, interval, go, index]);

  // Offset of slide i from the current one, wrapped to the shortest direction.
  const offsetOf = (i: number) => {
    let d = (i - index + count) % count;
    if (d > count / 2) d -= count;
    return d;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  if (count === 0) return null;

  return (
    <div
      className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden border border-ivory/10 bg-charcoal select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of Vijay Krishnan on set"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        onTouchEnd(e);
        setPaused(false);
      }}
    >
      {images.map((img, i) => {
        const offset = offsetOf(i);
        const near = Math.abs(offset) <= 1;
        return (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={720}
            height={900}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            aria-hidden={offset !== 0}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{
              transform: `translate3d(${Math.max(-1, Math.min(1, offset)) * 100}%,0,0)`,
              transition: near && !reduced ? 'transform 800ms cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
              visibility: near ? 'visible' : 'hidden',
            }}
          />
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-t from-cinemaBlack/90 via-transparent to-transparent pointer-events-none" />

      {/* Caption + counter */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between pointer-events-none">
        <div>
          <p className="eyebrow text-gold text-xs">{caption}</p>
          {subcaption && <p className="font-caption italic text-silver text-xs">{subcaption}</p>}
        </div>
        <p className="font-display text-sm tracking-widest text-ivory/80" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="text-silver/50">/ {String(count).padStart(2, '0')}</span>
        </p>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-ivory/20 bg-cinemaBlack/50 backdrop-blur-sm text-ivory hover:border-gold hover:text-gold transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-ivory/20 bg-cinemaBlack/50 backdrop-blur-sm text-ivory hover:border-gold hover:text-gold transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      {/* Progress bar (shows position without 20 tiny dots) */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-ivory/10 pointer-events-none">
        <div
          className="h-full bg-gold transition-[width] duration-500"
          style={{ width: `${((index + 1) / count) * 100}%` }}
        />
      </div>

      {/* Frame corners */}
      <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/60 pointer-events-none" />
      <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/60 pointer-events-none" />
    </div>
  );
};

export default PortraitSlider;
