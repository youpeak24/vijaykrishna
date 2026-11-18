import React, { useRef, useEffect } from 'react';
import { magneticHover } from '../../utils/animations';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit';
  'data-cursor'?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  type = 'button',
  'data-cursor': dataCursor,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const cleanup = magneticHover(ref.current);
    return () => {
      cleanup?.();
    };
  }, []);

  const baseClass = variant === 'primary'
    ? 'btn-primary'
    : variant === 'secondary'
    ? 'btn-secondary'
    : 'btn-ghost';

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${baseClass} ${className}`}
        data-cursor={dataCursor}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={`${baseClass} ${className}`}
      onClick={onClick}
      data-cursor={dataCursor}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
