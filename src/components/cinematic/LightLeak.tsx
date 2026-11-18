import React from 'react';

interface LightLeakProps {
  color?: string;
  size?: string;
  position?: string;
  className?: string;
}

const LightLeak: React.FC<LightLeakProps> = ({
  color = '#E9B96E',
  size = '600px',
  position = 'top-0 right-0',
  className = '',
}) => {
  return (
    <div
      className={`light-leak ${position} ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
      aria-hidden="true"
    />
  );
};

export default LightLeak;
