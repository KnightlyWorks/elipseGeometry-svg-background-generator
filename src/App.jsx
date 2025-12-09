import { useState } from 'react';
import { WavyBackground } from './WavyBackground.jsx'
import ControlPanel from './Controls.jsx';


export default function App () {
  const [radius, setRadius] = useState(20);
  const [pointsPerCurve, setPointsPerCurve] = useState(100); 
  const [curves, setCurves] = useState()

  
    return (
        <div className='grid md:grid-cols-[1fr_4fr] bg-background'>
            <ControlPanel setRadius={setRadius} setPointsPerCurve={setPointsPerCurve} setCurves={setCurves} radius={radius} pointsPerCurve={pointsPerCurve} />
            <WavyBackground radius={radius} pointsPerCurve={pointsPerCurve} curves={curves}  />
        </div>
    )
}