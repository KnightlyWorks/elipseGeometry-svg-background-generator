import { Bezier } from 'bezier-js';
import { useMemo } from 'react';


const CURVE_POINTS = [
  [40, 40, 20, 160, 40, 320, 80, 360],
  [80, 360, 120, 360, 160, 200, 200, 120],
  [200, 120, 240, 200, 280, 360, 320, 360],
  [320, 360, 360, 360, 380, 160, 360, 40],
  [360, 40, 400, 40, 420, 80, 410, 100],
  [410, 100, 390, 280, 360, 380, 320, 380],
  [320, 380, 280, 380, 250, 240, 210, 280],
  [210, 280, 170, 320, 120, 380, 80, 380],
  [80, 380, 40, 380, 10, 280, 10, 100],
  [10, 100, 10, 60, 40, 40, 40, 40]
];

const createBezierFromPoints = (pts) => new Bezier(
    { x: pts[0], y: pts[1] }, { x: pts[2], y: pts[3] },
    { x: pts[4], y: pts[5] }, { x: pts[6], y: pts[7] }
);
const DEFAULT_BEZIER_CURVES = CURVE_POINTS.map(createBezierFromPoints);


export function WavyBackground({
  curves, 
  radius = 20, 
  pointsPerCurve = 100, 
  transformSVG = {scale:1, translate:{x:10, y:0}},
  chaos = true, 
  alternating = false 
}) {

  const transformAtribute = (transformSVG) => {
    return `translate(${transformSVG.translate.x} ${transformSVG.translate.y}) scale(${transformSVG.scale})`
  }
    
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
        <g transform={transformAtribute(transformSVG)}>
          <path d={path1} fill="none" stroke="blue" strokeWidth="2" />
          <path d={path2} fill="none" stroke="red" strokeWidth="2" strokeOpacity="0.7"/>
        </g>
      </svg>
    </div>
  );
}

function generateOptimizedPaths(curves, radius, steps, chaos, alternating) {
  const allPaths1 = [];
  const allPaths2 = [];

  curves.forEach((curve, index) => {
    const points = curve.getLUT(steps); 
    
    const baseDirection = alternating ? (index % 2 === 0 ? 1 : -1) : 1;

    let config;

    if (chaos) {

        config = {
            spiralDirection: (Math.random() > 0.5 ? 1 : -1) * (alternating ? baseDirection : 1),
            spiralIntensity: 0.95 + Math.random() * 0.1,
            phaseShift: Math.random() * Math.PI * 2,
            frequencyMult: 0.8 + Math.random() * 0.4
        };
    } else {
        config = {
            spiralDirection: baseDirection,
            spiralIntensity: 1,
            phaseShift: index * 0.5, 
            frequencyMult: 1
        };
    }

    const wavyPoints1 = applyWaveToPoints(points, radius, config);
    const wavyPoints2 = applyWaveToPoints(points, -radius, config);
    
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