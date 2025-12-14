import clsx from 'clsx';

import { use, useState } from 'react';

import { WavyBackground } from './WavyBackground.jsx'
import ControlPanel from './Controls.jsx';
import Header from './Header.jsx';

export default function App () {

  // generation variables
  //Global quality
  const [radius, setRadius] = useState(20);
  const [pointsPerCurve, setPointsPerCurve] = useState(100); 
  const [chaos, setChaos] = useState(true)
  const [alternating, setAlternating] = useState(false)

  //Pattern
  const [curves, setCurves] = useState()
  
  //transform
  const [transformSVG,setTransformSVG] = useState({scale:1, translate:{x:0, y:0}})
  

  // UI states
  const [isSettingsMenuOpen, setSettingsMenu] = useState(true)

  // Handlers
  const toggleSettingsMenu = () => {
    setSettingsMenu(prev => !prev)
  }
  
  return (
      <div className='w-full max-w-[2000px] mx-auto bg-background'>
          <Header toggleSettingsFunction={toggleSettingsMenu} isSettingsOpen={isSettingsMenuOpen} />
          <div className={clsx('grid transition-all duration-200', isSettingsMenuOpen ? 'md:grid-cols-[1fr_4fr]' : 'md:grid-cols-[0fr_4fr]')}>
              <ControlPanel alternating={alternating} setAlternating={setAlternating} chaos={chaos} setChaos={setChaos} setTransformSVG={setTransformSVG} isOpen={isSettingsMenuOpen} setRadius={setRadius} setPointsPerCurve={setPointsPerCurve} setCurves={setCurves}/>
              <WavyBackground  alternating={alternating} chaos={chaos} radius={radius} pointsPerCurve={pointsPerCurve} curves={curves} transformSVG={transformSVG}  />
          </div>
      </div>
  )
}