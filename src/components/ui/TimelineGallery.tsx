import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { TimelinePhoto } from '../../data/timeline';

interface TimelineGalleryProps {
  photos: TimelinePhoto[];
  /** Any CSS colour — frame corners, active thumbnail, glow. */
  accent: string;
  /** Milliseconds each photo stays on screen. */
  interval?: number;
  /** Adds widescreen letterbox bars + a "REC" marker (used for the upcoming movie). */
  cinematic?: boolean;
  /** Accessible name for the carousel region. */
  label: string;
}

/**
 * Cross-fading photo gallery for a timeline chapter: Ken-Burns drift, autoplay (only while on screen),
 * thumbnail rail with progress, swipe + keyboard navigation, and reduced-motion support.
 */
const TimelineGallery: React.FC<TimelineGalleryProps> = ({
  photos,
  accent,
  interval = 4200,
  cinematic = false,
  label,
}) => {
  const count = photos.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const touchStart = useRef<number | null>(null);
  const [viewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.25, once: false });

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  const running = !reduced && !hovered && inView && count > 1;

  // Autoplay — keyed on `index` so manual navigation restarts the timer.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(1), interval);
    return () => window.clearTimeout(id);
  }, [running, index, interval, go]);

  if (count === 0) return null;

  const current = photos[index];
  const chipTop = cinematic ? 'top-[calc(7%+0.75rem)]' : 'top-4';
  const counterBottom = cinematic ? 'bottom-[calc(7%+0.75rem)]' : 'bottom-4';

  return (
    <div
      ref={viewRef}
      className="w-full max-w-[30rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden border border-ivory/10 bg-charcoal select-none outline-none focus-visible:ring-1 focus-visible:ring-gold"
        style={{ boxShadow: `0 40px 90px -40px ${accent}66, 0 0 0 1px ${accent}1F` }}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
          setHovered(true);
        }}
        onTouchEnd={(e) => {
          if (touchStart.current !== null) {
            const dx = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }
          touchStart.current = null;
          setHovered(false);
        }}
      >
        {/* Slides */}
        {photos.map((photo, i) => {
          const active = i === index;
          return (
            <div
              key={photo.src + i}
              aria-hidden={!active}
              className="absolute inset-0 transition-opacity duration-[1100ms] ease-in-out motion-reduce:transition-none"
              style={{ opacity: active ? 1 : 0 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={1000}
                height={1250}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`h-full w-full object-cover object-[50%_18%] ${active ? 'tl-kenburns' : ''}`}
              />
            </div>
          );
        })}

        {/* Colour grade + vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cinemaBlack/85 via-transparent to-cinemaBlack/30" />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40"
          style={{ background: `linear-gradient(135deg, ${accent}55, transparent 55%)` }}
        />

        {/* Letterbox for the upcoming movie */}
        {cinematic && (
          <>
            <div className="absolute inset-x-0 top-0 z-10 flex h-[7%] items-center justify-between bg-black px-4">
              <span className="flex items-center gap-2 font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-ivory/70">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
                Rec
              </span>
              <span className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-ivory/50">
                Scene 01 · Take 01
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 flex h-[7%] items-center justify-between bg-black px-4">
              <span className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-ivory/50">
                2.39 : 1
              </span>
              <span className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-ivory/70">
                Coming 2027
              </span>
            </div>
          </>
        )}

        {/* Role chip */}
        <div className={`absolute left-4 z-10 ${chipTop}`}>
          <span
            key={current.label + index}
            className="inline-flex animate-fade-in items-center gap-2 border bg-cinemaBlack/60 px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory backdrop-blur-md"
            style={{ borderColor: `${accent}88` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {current.label}
          </span>
        </div>

        {/* Counter */}
        <p
          className={`absolute right-4 z-10 font-display text-sm tracking-widest text-ivory/80 ${counterBottom}`}
          aria-live="off"
        >
          {String(index + 1).padStart(2, '0')}
          <span className="text-silver/50"> / {String(count).padStart(2, '0')}</span>
        </p>

        {/* Frame corners */}
        <span className="pointer-events-none absolute left-3 top-3 z-20 h-5 w-5 border-l border-t" style={{ borderColor: `${accent}AA` }} />
        <span className="pointer-events-none absolute right-3 top-3 z-20 h-5 w-5 border-r border-t" style={{ borderColor: `${accent}AA` }} />
        <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-5 w-5 border-b border-l" style={{ borderColor: `${accent}AA` }} />
        <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-5 w-5 border-b border-r" style={{ borderColor: `${accent}AA` }} />
      </div>

      {/* Thumbnail rail */}
      {count > 1 && (
        <div
          className="mt-3 grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`, maxWidth: `${count * 4.75}rem` }}
        >
          {photos.map((photo, i) => {
            const active = i === index;
            return (
              <button
                key={photo.src + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${count} — ${photo.label}`}
                aria-current={active}
                className={`group relative aspect-square overflow-hidden border transition-all duration-500 ${
                  active ? 'opacity-100' : 'opacity-45 hover:opacity-90'
                }`}
                style={{ borderColor: active ? accent : 'rgba(245,240,232,0.12)' }}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover object-[50%_15%] transition-transform duration-700 group-hover:scale-110"
                />
                {active && (
                  <span
                    key={index}
                    className="tl-progress absolute inset-x-0 bottom-0 h-[3px]"
                    style={{
                      background: accent,
                      animationDuration: `${interval}ms`,
                      animationPlayState: running ? 'running' : 'paused',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimelineGallery;
