import ControlRangeSlider from "@widgets/ControlRangeSlider.jsx";
import Checkbox from "@widgets/Checkbox.jsx";

const GLOBAL_QUALITY_SCHEMA = [
  { key: 'radius', label: 'Radius', type: 'range', min: 0, max: 200 },
  { key: 'pointsPerCurve', label: 'Resolution (Points)', type: 'range', min: 2, max: 300 },
  { key: 'chaos', label: 'Enable Chaos', type: 'boolean' },
  { key: 'alternating', label: 'Enable Alternating', type: 'boolean' },
];

export default function GlobalSettings({ config, getSetter }) {
  return (
    <div className="space-y-6 pt-2">
      <div className="bottom-divider space-y-4">
        {GLOBAL_QUALITY_SCHEMA.filter(s => s.type === 'range').map(item => (
          <ControlRangeSlider
            key={item.key}
            setterFunction={getSetter(item.key)}
            labelText={item.label}
            min={item.min}
            max={item.max}
            defaultValue={config[item.key]}
          />
        ))}
      </div>
      <div className="panel-card flex flex-col md:flex-row mt-8">
        {GLOBAL_QUALITY_SCHEMA.filter(s => s.type === 'boolean').map(item => (
          <Checkbox
            key={item.key}
            label={item.label}
            isChecked={config[item.key]}
            setterFunction={getSetter(item.key)}
          />
        ))}
      </div>
    </div>
  );
}