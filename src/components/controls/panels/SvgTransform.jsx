import { useState } from "react"
//UI
import ControlRangeSlider from "@widgets/ControlRangeSlider"
import RadioButtonsPanel from "@widgets/RadioButtonsPanel"

export default function BackgroundTransformSettings({ config, getSetter }) {
  const [step, setStep] = useState(10); 

  return (
    <div className="panel-card flex flex-col gap-4">
      <div className="bottom-divider space-y-4">
        <ControlRangeSlider 
          step={step} 
          labelText="Translate X"
          value={config.translateX}
          onChange={getSetter('translateX')}
          min={-1000} 
          max={1000}
          toolTipText="Moves the pattern horizontally within the canvas."
        />
        
        <ControlRangeSlider 
          step={step} 
          labelText="Translate Y"
          value={config.translateY}
          onChange={getSetter('translateY')}
          min={-1000} 
          max={1000} 
          toolTipText="Moves the pattern vertically within the canvas."
        />
        
        <div className="flex items-center gap-2">
          <RadioButtonsPanel 
            currentValue={step} 
            setterFunction={setStep} 
            groupName="Step"
            arrayOButtons={[
              { label: '100', value: 100 }, 
              { label: '50', value: 50 }, 
              { label: '10', value: 10 }
            ]} 
          />
        </div>
      </div>

      <ControlRangeSlider 
        labelText="Scale"
        value={config.scale}
        onChange={getSetter('scale')}
        min={0.1} 
        max={5} 
        step={0.05} 
        toolTipText="Zooms the entire SVG in or out."
      />
      
      <ControlRangeSlider 
        labelText="Stroke Width"
        value={config.strokeWidth || 2}
        onChange={getSetter('stroke')}
        min={0.1} 
        max={20} 
        step={0.1} 
        toolTipText="Adjusts the thickness of the lines."
      />
    </div>
  );
}