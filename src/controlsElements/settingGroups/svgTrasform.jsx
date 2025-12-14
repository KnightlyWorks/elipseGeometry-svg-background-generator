

import { useState, useEffect } from "react"

//UI
import ControlRangeSlider from "../widgets/ControlRangeSlider"
import RadioButtonsPanel from "../widgets/RadioButtonsPanel"



export default function BackgroundTransformSettings ({setterFunction}) {
    const [step, setStep] = useState(10)

    //Transform params
    const [translateX,setTranslateX] = useState(0)
    const [translateY,setTranslateY] = useState(0)
    const [scale,setScale] = useState(1)

      useEffect(() => {
    const timer = setTimeout(() => {
      setterFunction({scale:scale, translate:{x:translateX,y:translateY}});
    }, 100);
    return () => clearTimeout(timer);
  }, [translateX, translateY, scale, setterFunction]);
    
    return (
        <div className="panel-card flex flex-col gap-4">
            <div className="bottom-divider space-y-4">
                <ControlRangeSlider step={step} labelText={'Translate X'} defaultValue={0} setterFunction={setTranslateX} min={-1000} max={1000} />
                <ControlRangeSlider step={step} labelText={'Translate Y'} defaultValue={0} setterFunction={setTranslateY} min={-1000} max={1000} />
                <RadioButtonsPanel currentValue={step} setterFunction={setStep} groupName={'Step'} arrayOButtons={[{label:'100', value: 100 }, {label:'50', value: 50}, {label:'10', value: 10}]} />
            </div>


            <ControlRangeSlider labelText={'Scale'} defaultValue={1} setterFunction={setScale} min={0.1} max={5} step={0.05} />
        </div>
    )
}