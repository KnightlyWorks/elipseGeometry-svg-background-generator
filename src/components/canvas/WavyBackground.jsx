import React, { useMemo, useRef, useLayoutEffect } from 'react';

// Utils
import { generateOptimizedPaths } from './wavyBackground/pathGeneration';

// UI
import SvgGradientDef from '@components/svg/SvgGradientDef';


import { MAIN_GRADIENT_ID } from '/src/constants/constants';


export function WavyBackground({
  
  radius = 20,
  pointsPerCurve = 100,
  chaos = true,
  alternating = false,

  curves,
  activeStops = null,
  transformSVG = { scale: 1, translateX: 0, translateY: 0, stroke: 1 }, 
  setCodeString   
}) {
  const svgRef = useRef(null);

  const { path1, path2 } = useMemo(() => {
    return generateOptimizedPaths(
      curves, 
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

  const { scale, translateX, translateY, stroke } = transformSVG;
  const transformStr = `translate(${translateX} ${translateY}) scale(${scale})`;

  return (
    <div ref={svgRef} className='p-4 h-fit bg-background'>
        <svg
          className='max-h-screen w-full h-full'
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
              strokeWidth={`${stroke}`} 
            />
            <path 
              d={path2} 
              stroke={activeStops ? `url(#${MAIN_GRADIENT_ID})` : 'red'}  
              fill='none' 
              strokeWidth={`${stroke}`} 
              strokeOpacity="0.7"
            />
          </g>
        </svg>
    </div>
  );
}