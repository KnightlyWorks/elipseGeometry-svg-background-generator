

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
                    labelText={'Translate X'} 
                    defaultValue={config.translateX} 
                    setterFunction={getSetter('translateX')} 
                    min={-1000} max={1000} 
                />
                <ControlRangeSlider 
                    step={step} 
                    labelText={'Translate Y'} 
                    defaultValue={config.translateY} 
                    setterFunction={getSetter('translateY')} 
                    min={-1000} max={1000} 
                />
                <RadioButtonsPanel 
                    currentValue={step} 
                    setterFunction={setStep} 
                    groupName={'Step'} 
                    arrayOButtons={[{label:'100', value: 100 }, {label:'50', value: 50}, {label:'10', value: 10}]} 
                />
            </div>

            <ControlRangeSlider 
                labelText={'Scale'} 
                defaultValue={config.scale} 
                setterFunction={getSetter('scale')} 
                min={0.1} max={5} step={0.05} 
            />
            <ControlRangeSlider 
                labelText={'Stroke Width'} 
                defaultValue={config.scale} 
                setterFunction={getSetter('stroke')} 
                min={0.1} max={5} step={0.05} 
            />
        </div>
    );
}