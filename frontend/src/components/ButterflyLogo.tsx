import React from 'react';
import { motion } from 'motion/react';

interface ButterflyLogoProps {
  className?: string;
  size?: number;
  color?: string;
  withMedallion?: boolean;
  animated?: boolean;
  /** Use the real logo image (default: false — keeps SVG for decorative use) */
  useImage?: boolean;
}

export const ButterflyLogo: React.FC<ButterflyLogoProps> = ({
  className = '',
  size = 32,
  color = '#C5A880',
  withMedallion = false,
  animated = true,
  useImage = true,
}) => {
  const imageEl = (
    <motion.img
      src="/papilio-logo-cutout.png"
      alt="Papilio Butterfly Logo"
      width={size}
      height={Math.round(size * 1.09)}
      className={withMedallion ? '' : className}
      style={{
        width: size,
        height: 'auto',
        aspectRatio: '792 / 862',
        objectFit: 'contain',
        filter: 'drop-shadow(0 2px 10px rgba(223, 195, 134, 0.45))',
      }}
      whileHover={animated ? { scale: 1.08, rotate: [0, -3, 3, 0] } : undefined}
      transition={{ duration: 0.4 }}
    />
  );

  if (withMedallion) {
    return (
      <motion.div
        whileHover={animated ? { scale: 1.05, y: -2 } : undefined}
        transition={{ duration: 0.25 }}
        className={`inline-flex items-center justify-center rounded-full bg-[#FAF4EB] border border-[#E8DCCB] shadow-sm p-3 ${className}`}
      >
        {imageEl}
      </motion.div>
    );
  }

  return imageEl;
};

export default ButterflyLogo;
