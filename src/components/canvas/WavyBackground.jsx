import { useMemo } from 'react';

// Utils
import { generateOptimizedPaths } from './wavyBackground/pathGeneration';
import { DEFAULT_BEZIER_CURVES, MAIN_GRADIENT_ID } from './wavyBackground/constants';

// UI
import SvgGradientDef from '../svg/SvgGradientDef';

export function WavyBackground({
  curves, 
  radius = 20, 
  pointsPerCurve = 100, 
  transformSVG = { scale: 1, translate: { x: 10, y: 0 } },
  chaos = true, 
  alternating = false,
  activeStops = null 
}) {
  const transformAttribute = (transformSVG) => {
    return `translate(${transformSVG.translate.x} ${transformSVG.translate.y}) scale(${transformSVG.scale})`;
  };
    
  const { path1, path2 } = useMemo(() => {
    return generateOptimizedPaths(
      curves ?? DEFAULT_BEZIER_CURVES, 
      radius, 
      pointsPerCurve,
      chaos,
      alternating 
    );
  }, [curves, radius, pointsPerCurve, chaos, alternating]);

  return (
    <div className='p-4 h-fit bg-background'>
      <svg 
        className='max-h-screen'
        width="100%"
        height="100%"
        viewBox="0 0 600 600" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {activeStops && (
          <SvgGradientDef id={MAIN_GRADIENT_ID} stops={activeStops} />
        )}
        <g transform={transformAttribute(transformSVG)}>
          <path 
            d={path1} 
            stroke={activeStops ? `url(#${MAIN_GRADIENT_ID})` : 'blue'} 
            fill='none' 
            strokeWidth="2" 
          />
          <path 
            d={path2} 
            stroke={activeStops ? `url(#${MAIN_GRADIENT_ID})` : 'red'}  
            fill='none' 
            strokeWidth="2" 
            strokeOpacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}