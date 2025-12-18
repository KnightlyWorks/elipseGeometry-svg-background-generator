import React, { useMemo, useRef, useLayoutEffect } from 'react';

// Utils
import { generateOptimizedPaths } from './wavyBackground/pathGeneration';
import { DEFAULT_BEZIER_CURVES, MAIN_GRADIENT_ID } from './wavyBackground/constants';

// UI
import SvgGradientDef from '@components/svg/SvgGradientDef';

export function WavyBackground({
  /* Shape Geometry */
  curves,             // coordinates for Bezier paths
  radius = 20,        // Bending amplitudes
  pointsPerCurve = 100, // Resolution of the lines

  /* Visual Style*/
  chaos = true,       // Enables random variations in the paths
  alternating = false, // Flips direction or style between curves
  activeStops = null,  // Gradient color configuration (array of stops)
  
  transformSVG = { scale: 1, translate: { x: 10, y: 0 } }, 
  setCodeString   
}) {
  const svgRef = useRef(null);

  const { path1, path2 } = useMemo(() => {
    return generateOptimizedPaths(
      curves ?? DEFAULT_BEZIER_CURVES, 
      radius, 
      pointsPerCurve,
      chaos,
      alternating 
    );
  }, [curves, radius, pointsPerCurve, chaos, alternating]);

  useLayoutEffect(() => {
    if (svgRef.current && setCodeString) {
      const svgCode = svgRef.current.innerHTML;
      setCodeString(svgCode);
    }
  }, [path1, path2, transformSVG, activeStops, setCodeString]);

  const transformStr = `translate(${transformSVG.translate.x} ${transformSVG.translate.y}) scale(${transformSVG.scale})`;

  return (
    <div ref={svgRef}  className='p-4 h-fit bg-background'>
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
          <g transform={transformStr}>
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