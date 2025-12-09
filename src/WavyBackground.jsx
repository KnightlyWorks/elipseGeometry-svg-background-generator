import { Bezier } from 'bezier-js';
import { useMemo } from 'react';

export function WavyBackground({curves, radius = 20, pointsPerCurve = 100 }) {

const { path1, path2 } = useMemo(() => {
    const curvesToProcess = curves ?? [
      new Bezier(
        { x: 50, y: 50 },
        { x: 450, y: 50 },
        { x: 50, y: 450 },
        { x: 450, y: 450 }
      )
    ];

    return generateOptimizedPaths(curvesToProcess, radius, pointsPerCurve);
  }, [curves, radius, pointsPerCurve]); 

  return (
    <div className='p-4'>
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 700 300" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path1} fill="none" stroke="blue" strokeWidth="2"/>

      <path d={path2} fill="none" stroke="red" strokeWidth="2"/>
    </svg>

    </div>
  );
}

function generateOptimizedPaths(curves, radius, steps) {
  const allPaths1 = [];
  const allPaths2 = [];

  curves.forEach(curve => {
    const points = curve.getLUT(steps); 
  
    const waveConfig = {
      spiralDirection: Math.random() > 0.5 ? 1 : -1,
      spiralIntensity: 0.95 + Math.random() * 0.1,
      phaseShift: Math.random() * Math.PI * 2,
      frequencyMult: 0.8 + Math.random() * 0.4
    };

    const wavyPoints1 = applyWaveToPoints(points, radius, waveConfig);
    const wavyPoints2 = applyWaveToPoints(points, -radius, waveConfig);
    
    allPaths1.push(buildLinearPath(wavyPoints1));
    allPaths2.push(buildLinearPath(wavyPoints2));
  });

  return {
    path1: allPaths1.join(' '),
    path2: allPaths2.join(' ')
  };
}

function applyWaveToPoints(points, radius, config) {
  const N = points.length;
  

  const { spiralDirection, spiralIntensity, phaseShift, frequencyMult } = config;
  
  return points.map((p, i) => {
    const t = ((2 * Math.PI * i) / N) * frequencyMult * spiralDirection + phaseShift;

    const progressRadius = radius * spiralIntensity * (1 + (i / N) * 0.2 * spiralDirection);

    const offsetX = progressRadius * Math.cos(t);
    const offsetY = progressRadius * Math.sin(t);
    
    return {
      x: p.x + offsetX,
      y: p.y + offsetY
    };
  });
}

function buildLinearPath(points) {
  if (!points.length) return '';

  const round = (num) => num.toFixed(1);
  let d = `M${round(points[0].x)} ${round(points[0].y)}`;

  for (let i = 1; i < points.length; i++) {
    d += ` L${round(points[i].x)} ${round(points[i].y)}`;
  }

  return d;
}