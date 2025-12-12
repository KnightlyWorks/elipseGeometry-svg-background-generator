import { Bezier } from 'bezier-js';
import { useMemo } from 'react';

export function WavyBackground({curves, radius = 20, pointsPerCurve = 100 }) {

const { path1, path2 } = useMemo(() => {
const curvesToProcess = curves ?? [
  // Первая кривая: M2,2 C 1,8 2,16 4,18
  new Bezier(
    { x: 40, y: 40 },
    { x: 20, y: 160 },
    { x: 40, y: 320 },
    { x: 80, y: 360 }
  ),
  // Вторая: C 6,18 8,10 10,6
  new Bezier(
    { x: 80, y: 360 },
    { x: 120, y: 360 },
    { x: 160, y: 200 },
    { x: 200, y: 120 }
  ),
  // Третья: C 12,10 14,18 16,18
  new Bezier(
    { x: 200, y: 120 },
    { x: 240, y: 200 },
    { x: 280, y: 360 },
    { x: 320, y: 360 }
  ),
  // Четвертая: C 18,18 19,8 18,2
  new Bezier(
    { x: 320, y: 360 },
    { x: 360, y: 360 },
    { x: 380, y: 160 },
    { x: 360, y: 40 }
  ),
  // Пятая: C 20,2 21,4 20.5,5
  new Bezier(
    { x: 360, y: 40 },
    { x: 400, y: 40 },
    { x: 420, y: 80 },
    { x: 410, y: 100 }
  ),
  // Шестая: C 19.5,14 18,19 16,19
  new Bezier(
    { x: 410, y: 100 },
    { x: 390, y: 280 },
    { x: 360, y: 380 },
    { x: 320, y: 380 }
  ),
  // Седьмая: C 14,19 12.5,12 10.5,14
  new Bezier(
    { x: 320, y: 380 },
    { x: 280, y: 380 },
    { x: 250, y: 240 },
    { x: 210, y: 280 }
  ),
  // Восьмая: C 8.5,16 6,19 4,19
  new Bezier(
    { x: 210, y: 280 },
    { x: 170, y: 320 },
    { x: 120, y: 380 },
    { x: 80, y: 380 }
  ),
  // Девятая: C 2,19 0.5,14 0.5,5
  new Bezier(
    { x: 80, y: 380 },
    { x: 40, y: 380 },
    { x: 10, y: 280 },
    { x: 10, y: 100 }
  ),
  // Десятая: C 0.5,3 2,2 2,2
  new Bezier(
    { x: 10, y: 100 },
    { x: 10, y: 60 },
    { x: 40, y: 40 },
    { x: 40, y: 40 }
  )
];

    return generateOptimizedPaths(curvesToProcess, radius, pointsPerCurve);
  }, [curves, radius, pointsPerCurve]); 

  return (
    <div className='p-4 h-fit bg-background'>
    <svg 
    className='max-h-screen'
      width="100%"
      height="100%"
      viewBox="0 0 600 600" 
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