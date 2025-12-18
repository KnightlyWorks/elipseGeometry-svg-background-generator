// patterns/HorizontalWavyLines.jsx
import { useState } from 'react';
import { Bezier } from 'bezier-js';
import ControlRangeSlider from '@widgets/ControlRangeSlider';

function generateHorizontalLines({ count, width, height, xDeviation, yChaos }) {
    const curves = [];
    

    const zoneHeight = height / count; 
    const overlap = 250; 

    for (let i = 0; i < count; i++) {

        const baseY = zoneHeight * (i + 0.5); 

        const startX = -overlap + (Math.random() * xDeviation * 2); 
        const endX = width + overlap - (Math.random() * xDeviation * 2);

        const startY = baseY + (Math.random() - 0.5) * yChaos;
        const endY = baseY + (Math.random() - 0.5) * yChaos;

        const cp1X = width * 0.3 + (Math.random() - 0.5) * xDeviation;
        const cp2X = width * 0.7 + (Math.random() - 0.5) * xDeviation;

        const cp1Y = startY + (Math.random() - 0.5) * yChaos * 1.5;
        const cp2Y = endY + (Math.random() - 0.5) * yChaos * 1.5;

        curves.push(new Bezier(
            { x: startX, y: startY },
            { x: cp1X, y: cp1Y }, 
            { x: cp2X, y: cp2Y }, 
            { x: endX, y: endY }
        ));
    }

    return curves;
}

export default function HorizontalWavyLines({ setCurves = () => {} }) {
    const [count, setCount] = useState(8);
    const [xDeviation, setXDeviation] = useState(100); 
    const [yChaos, setYChaos] = useState(150); 

    const handleGenerate = () => {
        const curves = generateHorizontalLines({
            count,
            width: 700,
            height: 300, 
            xDeviation,
            yChaos 
        });
        setCurves(curves);
    };

    return (
        <div className="space-y-4 border-t border-border pt-4 mt-4">
            <h3 className="text-sm font-bold text-text uppercase tracking-wider">
                Generator Settings
            </h3>
            
            <ControlRangeSlider
                setterFunction={setCount}
                labelText="Line Count"
                min={3}
                max={20}
                defaultValue={8}
                toolTipText="The number of horizontal layers to generate."
            />

            <ControlRangeSlider
                setterFunction={setXDeviation}
                labelText="X Spread"
                min={0}
                max={200}
                defaultValue={100}
                toolTipText="Controls horizontal randomness at the start and end of each line."
            />
            
            <ControlRangeSlider
                setterFunction={setYChaos}
                labelText="Y Flow"
                min={10}
                max={300} 
                defaultValue={150}
                toolTipText="Determines the vertical range of the curves. Higher values make the lines more 'wavy' and chaotic."
            />

            <button
                type='button'
                onClick={handleGenerate}
                className="btn-primary w-full py-2 text-text"
            >
                Regenerate Lines
            </button>
            <p className="text-[10px] text-text-tertiary text-center italic">
                * Click regenerate to apply changes
            </p>
        </div>
    );
}