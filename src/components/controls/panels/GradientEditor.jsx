import React, { useState, useRef } from 'react';
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker';
import useGradientStops from '@hooks/useGradientStops'
import SvgGradientDef from '../../svg/SvgGradientDef'
import useResizeObserver from '@hooks/useResizeObserver'; 

const GradientEditor = ({ onApply }) => {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const PREVIEW_ID = "editor_preview_gradient";

  // Gradient Logic
  const { isGradient, deletePoint, selectedPoint } = useColorPicker(color, setColor);
  const stops = useGradientStops(isGradient ? color : null);

  // Responsive Width Logic
  const colorPickerContainerRef = useRef(null); 
  const { width: containerWidth } = useResizeObserver(colorPickerContainerRef);
  const colorPickerWidth = Math.min((containerWidth > 0 ? containerWidth : 200), 400);

  const handleApply = () => {
    onApply({
      color: isGradient ? stops : color, 
      type: isGradient 
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2">
      <div className="panel-card px-1">
        <div className="mb-6">
          <label className="text-label">Gradient Configuration</label>
          <div 
            ref={colorPickerContainerRef}
            className="mt-2 p-1 rounded-lg bg-background-elevated border border-border/50"
          >
            <ColorPicker
              value={color}
              onChange={setColor}
              hideGradientControls
              hideInputType
              hideEyeDrop
              hideAdvancedSliders
              hideColorGuide
              hidePresets
              hideInputs
              height={180}
              width={colorPickerWidth} 
              className="bg-transparent! w-full mx-auto"
            />
            
            {isGradient && (
              <div className='px-2 py-1'> 
                <button 
                  className="btn-primary mt-2 w-full text-md" 
                  onClick={() => deletePoint(selectedPoint)}
                  disabled={stops.length <= 2}
                >
                  Delete Selected Point
                </button>
                <p className="text-[10px] text-text-tertiary text-center italic">
                  *Can delete when more then 2 points
              </p>
              </div>
            )}
          </div>
        </div>

        <div className="bottom-divider" />
        <div>
          <label className="text-label">Preview</label>
          <div className="relative h-24 w-full rounded-xl border border-border overflow-hidden mt-2 group">
            <svg width="100%" height="100%" className="relative z-10 transition-transform duration-500 group-hover:scale-105">
              <SvgGradientDef id={PREVIEW_ID} stops={isGradient ? stops : []} />
              <rect 
                x="0" y="0" 
                width="100%" height="100%" 
                fill={isGradient ? `url(#${PREVIEW_ID})` : color} 
              />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full py-2 md:pt-6">
            <button className="btn-primary w-fit gap-2 text-sm" onClick={handleApply}>
              Apply {isGradient ? 'Gradient' : 'Color'}
            </button>
            
            {isGradient && (
              <p className="text-text-muted text-xs mt-3 md:mt-0">
                {stops?.length || 0} color stops generated
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GradientEditor;