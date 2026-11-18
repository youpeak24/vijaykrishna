import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
}

export function revealText(
  element: HTMLElement | null,
  options: RevealTextOptions = {}
): gsap.core.Timeline | null {
  if (!element) return null;

  const { duration = 0.8, stagger = 0.05, delay = 0, y = 30 } = options;
  const text = element.textContent || '';
  const words = text.split(' ');

  element.innerHTML = words
    .map((word) => `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block">${word}&nbsp;</span></span>`)
    .join('');

  const spans = element.querySelectorAll('span > span');
  const tl = gsap.timeline({ delay });
  tl.from(spans, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: 'power3.out',
  });

  return tl;
}

export function revealImage(
  element: HTMLElement | null,
  options: { duration?: number; delay?: number } = {}
): gsap.core.Tween | null {
  if (!element) return null;

  const { duration = 1.2, delay = 0 } = options;

  gsap.set(element, { clipPath: 'inset(100% 0% 0% 0%)' });

  return gsap.to(element, {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration,
    delay,
    ease: 'power4.out',
  });
}

export function parallaxElement(
  element: HTMLElement | null,
  speed: number = 0.5
): ScrollTrigger | null {
  if (!element) return null;

  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const offset = self.progress * speed * 100;
      gsap.set(element, { y: `${offset}px` });
    },
  });
}

export function magneticHover(element: HTMLElement | null): (() => void) | null {
  if (!element) return null;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}
