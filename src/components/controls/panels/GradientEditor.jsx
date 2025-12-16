import React, { useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';
import useGradientStops from '../../../hooks/useGradientStops'
import SvgGradientDef from '../../svg/SvgGradientDef'

const GradientEditor = ({ onApply }) => {

  const [gradient, setGradient] = useState('linear-gradient(90deg, rgba(147,51,234,1) 0%, rgba(236,72,153,1) 100%)');
  
  const PREVIEW_ID = "editor_preview_gradient";

  const stops = useGradientStops(gradient);

  const handleApply = () => {
    if (onApply) {
        onApply(stops); 
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2">
      <div className="panel-card px-1">
        
        <div className="mb-6">
          <label className="text-label">Gradient Configuration</label>
          <div className="mt-2 p-1 rounded-lg bg-background-elevated border border-border/50">
            <ColorPicker
              value={gradient}
              onChange={setGradient}
              hideControls
              hidePresets
              height={180}
              className="bg-transparent! w-full"
              hideInputs={true}
            />
          </div>
        </div>

        <div className="bottom-divider" />

        <div>
          <label className="text-label">Preview</label>
          
          <div className="relative h-24 w-full rounded-xl border border-border overflow-hidden mt-2 group">
            <svg width="100%" height="100%" className="relative z-10 transition-transform duration-500 group-hover:scale-105">
              <SvgGradientDef id={PREVIEW_ID} stops={stops} />
              <rect x="0" y="0" width="100%" height="100%" fill={`url(#${PREVIEW_ID})`} />
            </svg>
          </div>

          <div className='flex flex-col md:flex-row justify-between w-full py-2 md:pt-6'>
            <button 
                className='btn-primary w-fit gap-2 text-sm' 
                onClick={handleApply}
            >
              Apply Gradient
            </button>
            <p className="text-text-muted text-xs mt-3 text-right">
              {stops.length} color stops generated
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GradientEditor;
