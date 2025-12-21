import idFromName from "@utils/idFromName";
import ToolTip from "./tooltips/Tooltip";

export default function Checkbox({ setterFunction, isChecked, label, toolTipText = '' }) {
  const fieldId = idFromName(label);
  
  return( 
    <div className="flex items-center gap-1 px-2 text-balance text-center" aria-describedby={toolTipText ? `${fieldId}-tooltip` : undefined}>
      <input
        type="checkbox"
        id={fieldId}
        checked={isChecked}
        onChange={(e) => setterFunction(e.target.checked)}
        className="w-4 h-4 accent-purple-600 cursor-pointer"
      />
      <div>
        <label 
          htmlFor={fieldId}
          className="text-sm cursor-pointer select-none"
        >
          {label}
        </label>
        
        {toolTipText && <ToolTip id={`${fieldId}-tooltip`} text={toolTipText} />}
      </div>
    </div>
  );
}