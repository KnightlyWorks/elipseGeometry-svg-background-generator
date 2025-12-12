import { useState } from 'react';
import { WavyBackground } from './WavyBackground.jsx'
import ControlPanel from './Controls.jsx';
import Header from './Header.jsx';
import clsx from 'clsx';


export default function App () {
  const [radius, setRadius] = useState(20);
  const [pointsPerCurve, setPointsPerCurve] = useState(100); 
  const [curves, setCurves] = useState()

  const [isSettingsMenuOpen, setSettingsMenu] = useState(true)

  const toggleSettingsMenu = () => {
    setSettingsMenu(prev => !prev)
  }
  
    return (
        <div className='w-full max-w-[2000px] mx-auto bg-background'>
            <Header toggleSettingsFunction={toggleSettingsMenu} isSettingsOpen={isSettingsMenuOpen} />
            <div className={clsx('grid transition-all', isSettingsMenuOpen ? 'md:grid-cols-[1fr_4fr]' : 'md:grid-cols-[0fr_4fr]')}>
                <ControlPanel isOpen={isSettingsMenuOpen} setRadius={setRadius} setPointsPerCurve={setPointsPerCurve} setCurves={setCurves} radius={radius} pointsPerCurve={pointsPerCurve} />
                <WavyBackground radius={radius} pointsPerCurve={pointsPerCurve} curves={curves}  />
            </div>
        </div>
    )
}