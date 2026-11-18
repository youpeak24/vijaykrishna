import React, { useRef, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import gsap from 'gsap';

interface AnimatedTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  animation?: 'words' | 'chars' | 'lines';
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  tag: Tag = 'p',
  className = '',
  animation = 'words',
  delay = 0,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.2, once: true });
  const prefersReduced = useReducedMotion();
  const animated = useRef(false);

  const setRefs = (el: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  useEffect(() => {
    if (!ref.current || animated.current) return;
    if (prefersReduced) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    const element = ref.current;
    let splits: HTMLElement[] = [];

    if (animation === 'words') {
      element.innerHTML = text
        .split(' ')
        .map(
          (w) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block">${w}&nbsp;</span></span>`
        )
        .join('');
      splits = Array.from(element.querySelectorAll<HTMLElement>('span > span'));
    } else if (animation === 'chars') {
      element.innerHTML = text
        .split('')
        .map(
          (c) =>
            c === ' '
              ? '&nbsp;'
              : `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block">${c}</span></span>`
        )
        .join('');
      splits = Array.from(element.querySelectorAll<HTMLElement>('span > span'));
    } else {
      splits = [element];
    }

    gsap.set(splits, { y: '100%', opacity: 0 });
  }, [text, animation, prefersReduced]);

  useEffect(() => {
    if (!isInView || !ref.current || animated.current || prefersReduced) return;
    animated.current = true;

    const element = ref.current;
    const splits = Array.from(element.querySelectorAll<HTMLElement>('span > span'));
    const targets = splits.length > 0 ? splits : [element];

    gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: animation === 'chars' ? 0.03 : 0.08,
      ease: 'power3.out',
      delay,
    });
  }, [isInView, delay, animation, prefersReduced]);

  return (
    <Tag ref={setRefs as any} className={className}>
      {text}
    </Tag>
  );
};

export default AnimatedText;
