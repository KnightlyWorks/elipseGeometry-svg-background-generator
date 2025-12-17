import { useState } from 'react';
import { Bezier } from 'bezier-js';
import Checkbox from '@widgets/Checkbox';
import ControlRangeSlider from '@widgets/ControlRangeSlider';

function generateSpiralCurves({ 
    spiralCount, armsPerSpiral, centerX, centerY, maxRadius, rotations, organicChaos, offsetCenters
  }) {

    const curves = [];
    for (let spiral = 0; spiral < spiralCount; spiral++) {
  
      const spiralOffsetAngle = (spiral / spiralCount) * Math.PI * 2;
  
      let spiralCenterX = centerX;
      let spiralCenterY = centerY;
      
      if (offsetCenters) {
        const offsetRadius = maxRadius * 0.3;
        spiralCenterX = centerX + Math.cos(spiralOffsetAngle) * offsetRadius;
        spiralCenterY = centerY + Math.sin(spiralOffsetAngle) * offsetRadius;
      }
      
      if (organicChaos) {
        spiralCenterX += (Math.random() - 0.5) * 50;
        spiralCenterY += (Math.random() - 0.5) * 50;
      }
  
      for (let i = 0; i < armsPerSpiral; i++) {
        const armBaseAngle = (i / armsPerSpiral) * (Math.PI * 2) + spiralOffsetAngle;
        const points = [];
  
        for (let p = 0; p < 4; p++) {
          const t = p / 3;
          
          let r = (maxRadius * 0.1) + (t * maxRadius * 0.9);
          if (organicChaos) {
            r *= (1 + (Math.random() - 0.5) * 0.5);
          }
  
          let angle = armBaseAngle + (t * rotations * Math.PI * 2);
          if (organicChaos) {
            angle += (Math.random() - 0.5) * 0.3;
          }
  
          points.push({
            x: spiralCenterX + r * Math.cos(angle),
            y: spiralCenterY + r * Math.sin(angle)
          });
        }
  
        curves.push(new Bezier(points[0], points[1], points[2], points[3]));
      }
    }
  
    return curves;
  }

export default function SpiralPattern({ setCurves = () => {} }) {
  const [spiralCount, setSpiralCount] = useState(1);
  const [armsPerSpiral, setArmsPerSpiral] = useState(8);
  const [maxRadius, setMaxRadius] = useState(250);
  const [rotations, setRotations] = useState(1.2);
  const [organicChaos, setOrganicChaos] = useState(false);
  const [offsetCenters, setOffsetCenters] = useState(false);

  const handleGenerate = () => {
    const curves = generateSpiralCurves({
      spiralCount,
      armsPerSpiral,
      centerX: 350,
      centerY: 150,
      maxRadius,
      rotations,
      organicChaos,
      offsetCenters
    });
    setCurves(curves);
  };

  return (
    <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">   
      <div className='space-y-4'>
          <ControlRangeSlider setterFunction={setSpiralCount} labelText="Number of Spirals" min={1} max={3} defaultValue={1} />
          <ControlRangeSlider setterFunction={setArmsPerSpiral} labelText="Arms per Spiral" min={3} max={25} defaultValue={8} />
          <ControlRangeSlider setterFunction={setMaxRadius} labelText="Radius (Size)" min={50} max={800} defaultValue={250} />
          <ControlRangeSlider setterFunction={setRotations} labelText="Twists" min={0.2} max={3.2} defaultValue={1.2} />
      </div>

      <div className="grid grid-cols-2 gap-2 bg-background-elevated p-2 rounded-lg border border-border">
        <Checkbox setterFunction={setOrganicChaos} isChecked={organicChaos} label={"Organic Chaos"} />
        <div className={spiralCount <= 1 ? "opacity-50 pointer-events-none" : ""}>
             <Checkbox setterFunction={setOffsetCenters} isChecked={offsetCenters} label={"Offset Centers"} />
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        className="btn-primary"
      >
        Generate Spiral
      </button>
    </div>
  );
}