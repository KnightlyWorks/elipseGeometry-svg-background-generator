import clsx from 'clsx';
import { useState, useCallback } from 'react';

import { WavyBackground } from '@components/canvas/WavyBackground.jsx';
import ImportMenu from '@components/svg/svgImportExport/SvgInputModal';
import ExportMenu from '@components/svg/svgImportExport/SvgExportModal';
import ControlPanel from '@components/controls/Controls.jsx';
import Header from '@components/layout/Header.jsx';
import Footer from '@components/layout/Footer';

export default function App() {
  // Generation Variables 
  const [genConfig, setGenConfig] = useState({
    radius: 20,
    pointsPerCurve: 100,
    chaos: true,
    alternating: false,
  });

  // Pattern state
  const [curves, setCurves] = useState();

  // SVG View State
  const [transformSVG, setTransformSVG] = useState({ 
    scale: 1, 
    translateX: 0, 
    translateY: 0,
    stroke: 1 
  });
  const [activeStops, setActiveStops] = useState(null);
  const [codeString, setCodeString] = useState('');

  // UI States
  const [isSettingsMenuOpen, setSettingsMenu] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // null | 'import' | 'export'

  // Handlers 
 const getSetter = useCallback((stateSetter) => (key) => (value) => {
  stateSetter((prev) => ({ ...prev, [key]: value }));
}, []);

  const toggleSettingsMenu = () => setSettingsMenu((prev) => !prev);
  
  const toggleModal = (target) => {
    setActiveModal((prev) => (prev === target ? null : target));
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="w-full max-w-[2000px] mx-auto bg-background grid grid-rows-[auto_1fr_auto]">
      <Header 
        toggleSettingsFunction={toggleSettingsMenu} 
        isSettingsOpen={isSettingsMenuOpen}
      >
        <ToggleButton 
          legend={'Import SVG'} 
          onApply={() => toggleModal('import')} 
        />
        <ToggleButton 
          legend={'Export SVG'} 
          onApply={() => toggleModal('export')} 
        />
        
        {activeModal === 'import' && (
          <ImportMenu onApply={setCurves} closeModal={closeModal} />
        )}
        {activeModal === 'export' && (
          <ExportMenu svgCode={codeString} closeModal={closeModal} />
        )}
      </Header>

      <div className={clsx(
        'grid transition-all duration-200', 
        isSettingsMenuOpen ? 'md:grid-cols-[1fr_3fr]' : 'md:grid-cols-[0fr_3fr]'
      )}>
      <ControlPanel
        transformSvgConfig={transformSVG} 
        globalQualityConfig={genConfig}
        
        getGenSetter={getSetter(setGenConfig)}
        getTransformSetter={getSetter(setTransformSVG)}
        
        setCurves={setCurves}
        setActiveStops={setActiveStops}
        isOpen={isSettingsMenuOpen}
      />
        
        <WavyBackground 
          {...genConfig} 
          transformSVG={transformSVG}
          curves={curves}
          activeStops={activeStops}
          setCodeString={setCodeString}
        />
      </div>
      <Footer />
    </div>
  );
}

function ToggleButton({ onApply, legend }) {
  return (
    <button 
      className="btn-primary text-nowrap text-purple-600 hocus:text-purple-700 transition-colors" 
      onClick={onApply}
    >
      {legend}
    </button>
  );
}