import { useEffect, useState } from "react";
import idFromName from "../../supportFunctions/idFromName";
export default function ControlRangeSlider({setterFunction, min, max, defaultValue, labelText}) {
  const [inputValue, setInputValue] = useState(defaultValue);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setterFunction(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setterFunction]);
  
  const fieldId =  idFromName(labelText)
  
  return (
    <div className="group relative grid gap-2 px-2">
      <label htmlFor={fieldId}>{labelText}</label> 
      <input 
        type="range"  
        id={fieldId} 
        name={fieldId}  
        value={inputValue}
        onChange={(e) => setInputValue(+e.target.value)} 
        min={min} 
        max={max}
      />
      <span className="group-hocus:block hidden absolute bg-surface/40 text-text/90 rounded top-6 left-1/2 -translate-x-1/2 w-fit z-10 px-1 py-0.5 pointer-events-none">
        {inputValue}
      </span>
    </div>
  );
}