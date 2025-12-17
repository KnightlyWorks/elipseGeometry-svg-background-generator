import clsx from 'clsx';

import { useState } from 'react';

import { WavyBackground } from '@components/canvas/WavyBackground.jsx';
import ImportMenu from '@components/svg/SvgInputModal';
import ExportMenu from '@components/svg/SvgExportModal';

import ControlPanel from '@components/controls/Controls.jsx';
//Layout
import Header from '@components/layout/Header.jsx';
import Footer from '@components/layout/Footer';


export default function App () {

  // generation variables
  //Global quality
  const [radius, setRadius] = useState(20);
  const [pointsPerCurve, setPointsPerCurve] = useState(100); 
  const [chaos, setChaos] = useState(true)
  const [alternating, setAlternating] = useState(false)

  //Pattern
  const [curves, setCurves] = useState()
  
  //SVG 
  const [transformSVG,setTransformSVG] = useState({scale:1, translate:{x:0, y:0}})
  const [activeStops, setActiveStops] = useState(null);
  const [codeString, setCodeString] = useState('')

  // UI states
  const [isSettingsMenuOpen, setSettingsMenu] = useState(true)
  const [isImportModalOpen,setImportModalOpen] =  useState(false)
  const [isExportModalOpen,setExportModalOpen] =  useState(false)
  
  // Handlers
  const toggleSettingsMenu = () => {
    setSettingsMenu(prev => !prev)
  }
  const toggleImportModalOpen = () => {
    setImportModalOpen(prev => !prev)
    setExportModalOpen(false)
  }
  const toggleExportModalOpen = () => {
    setExportModalOpen(prev => !prev)
    setImportModalOpen(false)
  }

  
  return (
      <div className='w-full max-w-[2000px] mx-auto bg-background grid grid-rows-[auto_1ft_auto]'>
          <Header toggleSettingsFunction={toggleSettingsMenu} isSettingsOpen={isSettingsMenuOpen}>
            <ToggleButton legend={'Inport SVG'} onApply={toggleImportModalOpen}/> 
            <ToggleButton  legend={'Export SVG'} onApply={toggleExportModalOpen}/> 
              {isImportModalOpen && <ImportMenu onApply={setCurves} closeModal={toggleImportModalOpen}/> }
              {isExportModalOpen && <ExportMenu svgCode={codeString} closeModal={toggleExportModalOpen}/> }
          </Header>
          <div className={clsx('grid transition-all duration-200', isSettingsMenuOpen ? 'md:grid-cols-[1fr_3fr]' : 'md:grid-cols-[0fr_3fr]')}>
              <ControlPanel setActiveStops={setActiveStops} alternating={alternating} setAlternating={setAlternating} chaos={chaos} setChaos={setChaos} setTransformSVG={setTransformSVG} isOpen={isSettingsMenuOpen} setRadius={setRadius} setPointsPerCurve={setPointsPerCurve} setCurves={setCurves}/>
              <WavyBackground setCodeString={setCodeString} activeStops={activeStops}  alternating={alternating} chaos={chaos} radius={radius} pointsPerCurve={pointsPerCurve} curves={curves} transformSVG={transformSVG}  />
          </div>
          <Footer/>
      </div>
  )
}

function ToggleButton ({onApply, legend}) {
  return (
    <button className='btn-primary text-nowrap text-purple-600 hocus:text-purple-700 transition-colors' onClick={() => {onApply()}}>{legend}</button>
  )
}