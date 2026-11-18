import React from 'react';
import { useInView } from '../../hooks/useInView';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: 'left' | 'center';
  accentColor?: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  subtext,
  align = 'left',
  accentColor,
  className = '',
}) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow mb-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ color: accentColor }}
        >
          {eyebrow}
        </p>
      )}

      <div className="overflow-hidden">
        <h2
          className={`font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-ivory transition-all duration-1000 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          {heading}
        </h2>
      </div>

      {subtext && (
        <p
          className={`body-text mt-6 max-w-xl ${align === 'center' ? 'mx-auto' : ''} transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {subtext}
        </p>
      )}

      <div
        className={`mt-6 h-px transition-all duration-1000 delay-200 ${
          isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        } origin-left`}
        style={{
          width: align === 'center' ? '80px' : '120px',
          background: accentColor || 'var(--gold)',
          margin: align === 'center' ? '24px auto 0' : '24px 0 0',
        }}
      />
    </div>
  );
};

export default SectionHeading;
