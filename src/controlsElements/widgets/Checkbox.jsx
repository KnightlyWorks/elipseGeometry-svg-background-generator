import idFromName from "../../supportFunctions/idFromName";
export default function Checkbox({ setterFunction, isChecked, label }) {
  const fieldId = idFromName(label);
  
  return( 
    <div className="flex items-center gap-1 px-2 text-balance text-center">
      <input
        type="checkbox"
        id={fieldId}
        checked={isChecked}
        onChange={(e) => setterFunction(e.target.checked)}
        className="w-4 h-4 accent-purple-600 cursor-pointer"
      />
      <label 
        htmlFor={fieldId}
        className="text-sm cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  );
}