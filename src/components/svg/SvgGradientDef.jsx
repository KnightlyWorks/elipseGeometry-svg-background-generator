import React from 'react';

const SvgGradientDef = ({ id, stops }) => {
  if (!stops || stops.length === 0) return null;

  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        {stops.map((stop, i) => (
          <stop
            key={i}
            offset={stop.offset}
            stopColor={stop.color}
            stopOpacity={stop.opacity}
          />
        ))}
      </linearGradient>
    </defs>
  );
};

export default SvgGradientDef;