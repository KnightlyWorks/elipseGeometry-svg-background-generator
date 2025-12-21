import ControlRangeSlider from "@widgets/ControlRangeSlider.jsx";
import Checkbox from "@widgets/Checkbox.jsx";

export default function GlobalSettings({ config, getSetter }) {
  return (
    <div className="space-y-6 pt-2">
      <div className="bottom-divider space-y-4">
        <ControlRangeSlider
          value={config.radius}
          onChange={getSetter('radius')}
          labelText="Radius"
          min={0}
          max={200}
          toolTipText="Sets the amplitude of the waves. High values create deeper curves."
        />
        
        <ControlRangeSlider
          value={config.pointsPerCurve}
          onChange={getSetter('pointsPerCurve')}
          labelText="Resolution (Points)"
          min={2}
          max={300}
          toolTipText="The number of calculated points. More points make the lines smoother but can slow down the browser and increase the size of the output file."
        />
      </div>

      <div className="panel-card flex flex-col md:flex-row mt-8 gap-4">
        <Checkbox
          label="Enable Chaos"
          isChecked={config.chaos}
          setterFunction={getSetter('chaos')}
          toolTipText="Introduces random offsets to each point for a hand-drawn, organic feel."
        />
        
        <Checkbox
          label="Enable Alternating"
          isChecked={config.alternating}
          setterFunction={getSetter('alternating')}
          toolTipText="Switches the direction of every other line to create a symmetrical pattern."
        />
      </div>
    </div>
  );
}