import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (cursorDot.current) {
        cursorDot.current.style.left = `${mouseX}px`;
        cursorDot.current.style.top = `${mouseY}px`;
      }

      const target = e.target as HTMLElement;
      const cursorAttr = target.getAttribute('data-cursor') ||
        target.closest('[data-cursor]')?.getAttribute('data-cursor') || '';

      if (cursorAttr) {
        setLabel(cursorAttr);
        setIsHovering(true);
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setLabel('');
        setIsHovering(true);
      } else {
        setLabel('');
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    const animateRing = () => {
      if (cursorRing.current) {
        ringX = lerp(ringX, mouseX, 0.12);
        ringY = lerp(ringY, mouseY, 0.12);
        cursorRing.current.style.left = `${ringX}px`;
        cursorRing.current.style.top = `${ringY}px`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDot}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          className={`rounded-full bg-gold transition-all duration-300 ${
            isHovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
        />
      </div>

      {/* Ring */}
      <div
        ref={cursorRing}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          className={`flex items-center justify-center rounded-full border border-ivory/40 transition-all duration-300 ${
            isHovering
              ? label
                ? 'w-20 h-20 border-gold/80 bg-cinemaBlack/60 backdrop-blur-sm'
                : 'w-12 h-12 border-ivory/60'
              : 'w-8 h-8'
          }`}
        >
          {label && (
            <span className="text-[9px] font-body font-semibold tracking-widest uppercase text-ivory text-center leading-tight px-1">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
