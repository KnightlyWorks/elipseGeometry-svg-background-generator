import idFromName from "../../../utils/idFromName";



export default function RadioButtonsPanel({ 
  setterFunction, 
  currentValue, 
  groupName, 
  arrayOButtons = [{label: '', value: null}]
}) {
  const groupNameWithOutSpaces = groupName.replaceAll(' ', '');
  
  return (
    <div className="space-y-2 panel-card">
      <h3 className="text-sm font-medium">{groupName}</h3>
      <div className="flex flex-wrap gap-4">
        {arrayOButtons.map((button, index) => (
          <RadioButton 
            key={`${groupNameWithOutSpaces}-${index}`}
            name={groupNameWithOutSpaces}
            currentValue={currentValue}
            label={button.label}
            valueToSet={button.value}
            setterFunction={setterFunction}
          />
        ))}
      </div>
    </div>
  );
}

function RadioButton({ label, setterFunction, valueToSet, currentValue, name }) {
  const id = `${idFromName(label)}-${name}-radio`; 
  
  return (
    <div className="flex items-center gap-2">
      <input 
        type="radio"
        id={id}
        name={name} 
        value={valueToSet}
        checked={valueToSet == currentValue} // Please keep Loose Equality Operator.
        onChange={(e) => setterFunction(e.target.value)}
        className="accent-purple-600 cursor-pointer"
      />
      <label 
        htmlFor={id}
        className="text-sm cursor-pointer select-none"
      >
        {label ?? valueToSet}
      </label>
    </div>
  );
}
