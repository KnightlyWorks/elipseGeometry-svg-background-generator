import { useEffect, useState } from "react";
import { Bezier } from 'bezier-js';
import RadioButtonsPanel from "@widgets/RadioButtonsPanel";
import ControlRangeSlider from "@widgets/ControlRangeSlider";
import Checkbox from "@widgets/Checkbox";

function generateEdgeLines({ verticalPosition, sidePosition, count, width, height, curvature, overflow = 100}) {
  const curves = [];
  

  const shouldInvert = (sidePosition === 'left' && verticalPosition === 'top') || 
                       (sidePosition === 'right' && verticalPosition === 'bottom');

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);

    const tVert = t;
    const tHoriz = shouldInvert ? (1 - t) : t;

    const start = {
      x: sidePosition === 'left' ? -overflow : width + overflow, 
      y: tVert * height
    };

    const end = {
      x: tHoriz * width,
      y: verticalPosition === 'top' ? -overflow : height + overflow
    };
    
    const cp1 = {
      x: start.x + (sidePosition === 'left' ? curvature : -curvature),
      y: start.y 
    };
    
    const cp2 = {
      x: end.x,
      y: end.y + (verticalPosition === 'top' ? curvature : -curvature)
    };
    
    curves.push(new Bezier(start, cp1, cp2, end));
  }
  
  return curves;
}
export default function JoiningTwoEdges({ setCurves = () => {} }) {
    const [verticalSelect, setVerticalSelect] = useState('top'); // top | bottom
    const [horizontalSelect, setHorizontalSelect] = useState('left'); // left | right
    const [count, setCount] = useState(10);
    const [curvature, setCurvature] = useState(150);
    const [overflow, setOverflow] = useState(150);

    //MultiPatternSection
    const [multiPattern,setMultiPattern] = useState(false)
    const [lastCurvesLength, setLastCurvesLength] = useState(0)


    const handleGenerate = () => {
        const curves = generateEdgeLines({
            verticalPosition: verticalSelect,
            sidePosition: horizontalSelect,
            count,
            width: 600,
            height: 600,
            curvature,
            overflow
        });
        setLastCurvesLength(curves.length); 

        if (multiPattern) {
            setCurves(oldCurves => {
                const combinedCurves = [...oldCurves, ...curves];
                if (combinedCurves.length > 150) {
                    return combinedCurves.slice(-150); 
                }
                return combinedCurves;
            });
        } else {
            setCurves(curves);
        }
    };

    const handleClearCurves = () => {
        if (!lastCurvesLength) return;
        
        setCurves(curves => {
            return curves.slice(-lastCurvesLength);
        });
    }

    useEffect(() => {
        const initialCurves = generateEdgeLines({
            verticalPosition: 'top',
            sidePosition: 'left',
            count: 10,
            width: 600,
            height: 600,
            curvature: 150,
            overflow: 150
        });
        setCurves(initialCurves);
        setLastCurvesLength(initialCurves.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //!oNLY mOUNTH!
    
  return (
    <div className="space-y-4 border-t border-border pt-4 mt-4">
        <h3 className="text-sm font-bold text-text uppercase tracking-wider">
            Edge Connection
        </h3>
        
        <section className="space-y-2">
            <RadioButtonsPanel 
            arrayOButtons={[
                { value: 'top', label: 'Top' }, 
                { value: 'bottom', label: 'Bottom' }
            ]} 
            groupName="Vertical Position" 
            currentValue={verticalSelect} 
            setterFunction={setVerticalSelect}
            />
            
            <RadioButtonsPanel 
            arrayOButtons={[
                { value: 'left', label: 'Left' }, 
                { value: 'right', label: 'Right' }
            ]} 
            groupName="Side Position"
            currentValue={horizontalSelect} 
            setterFunction={setHorizontalSelect}
            />
        </section>
        
        <section>
            <ControlRangeSlider
                value={count}
                onChange={setCount}
                labelText="Line Count"
                min={3}
                max={30}
            />
            
            <ControlRangeSlider
                value={curvature}
                onChange={setCurvature}
                labelText="Curvature"
                min={0}
                max={300}
            />

            <ControlRangeSlider
                value={overflow}
                onChange={setOverflow}
                labelText="Edge Extension"
                min={0}
                max={200}
                toolTipText="How far lines extend beyond canvas edges"
                />
        </section>

        <Checkbox toolTipText="Don't clear previous lines when generating new ones. Allows layering multiple patterns." setterFunction={setMultiPattern} isChecked={multiPattern} label={'Enable Multi Pattern'}/>


        <div className="space-y-6">
            <button
                type="button"
                onClick={handleGenerate}
                className="btn-primary w-full"
            >
                Generate Edge Lines
            </button>
            {multiPattern && <>
                <button type="button" onClick={handleClearCurves} className="btn-primary w-full animate-fade-up">
                    Clear all Expect last pattern
                </button>
            </>}
        </div>
    </div>
  );
}
