import { useEffect, useState } from "react";
import idFromName from "@utils/idFromName";
import ToolTip from "@widgets/tooltips/Tooltip";

export default function ControlRangeSlider({
  setterFunction, 
  min, 
  max, 
  defaultValue, 
  labelText, 
  step = 1, 
  toolTipText = ''
}) {

  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setterFunction(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setterFunction]);
  
  const fieldId = idFromName(labelText);
  
  return (
    <div className="group relative grid gap-2" aria-describedby={toolTipText ? `${fieldId}-tooltip` : undefined}>
      <div className="flex items-center gap-2">
        <label 
          className="text-label group-hocus:text-text transition-colors duration-200 cursor-pointer" 
          htmlFor={fieldId}
        >
          {labelText}
        </label>
        {toolTipText && <ToolTip id={`${fieldId}-tooltip`} text={toolTipText} />}
      </div>
      
      <input
        className="w-full cursor-pointer" 
        type="range"  
        id={fieldId} 
        name={fieldId}  
        value={inputValue} 
        onChange={(e) => setInputValue(+e.target.value)} 
        min={min} 
        max={max}
        step={step}
      />

      <span className="group-hocus:block hidden absolute bg-surface/40 text-text/90 rounded top-6 left-1/2 -translate-x-1/2 w-fit z-10 px-1 py-0.5 pointer-events-none backdrop-blur-sm border border-border/50">
        {inputValue}
      </span>
    </div>
  );
}