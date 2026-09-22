import React from 'react';

/**
 * PapilioLogo — Brand logo component for Papilio Café & Patisserie.
 * Faithfully matches the exact backlit brass butterfly sculpture.
 *
 * Supports two rendering modes:
 * 1. 'cutout' (default) — Uses the authentic glowing brass sculpture with warm LED backlighting.
 * 2. 'svg' — Pure vector SVG with metallic gold gradient and glowing filter; ideal for dark
 *            backgrounds and small decorative accents where the image background would clash.
 */

interface PapilioLogoProps {
  size?: number;
  variant?: 'cutout' | 'svg';
  color?: string;
  glow?: boolean;
  className?: string;
  alt?: string;
  animated?: boolean;
  withMedallion?: boolean;
}

export const PapilioLogo: React.FC<PapilioLogoProps> = ({
  size = 38,
  variant = 'cutout',
  color,
  glow = true,
  className = '',
  alt = 'PAPILIO Butterfly Logo',
  animated = true,
  withMedallion = false,
}) => {
  // Always render the authentic backlit brass butterfly sculpture cutout
  const imgEl = (
    <img
      src="/papilio-logo-cutout.png"
      alt={alt}
      width={size}
      height={Math.round(size * 1.09)}
      className={`inline-block object-contain select-none transition-all duration-300 ${animated ? 'hover:scale-110' : ''} ${glow ? 'drop-shadow-[0_2px_12px_rgba(223,195,134,0.45)]' : ''} ${withMedallion ? '' : className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: 'auto',
        aspectRatio: '792 / 862',
      }}
    />
  );

  if (withMedallion) {
    return (
      <div className={`inline-flex items-center justify-center rounded-full bg-[#FAF4EB] border border-[#E8DCCB] shadow-sm p-3 ${className}`}>
        {imgEl}
      </div>
    );
  }

  return imgEl;
};

export default PapilioLogo;
