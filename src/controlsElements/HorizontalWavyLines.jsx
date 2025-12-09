// patterns/HorizontalWavyLines.jsx
import { useState } from 'react';
import { Bezier } from 'bezier-js';
import ControlRangeSlider from './widgets/ControlRangeSlider';

function generateHorizontalLines({ count, width, height, xDeviation, yChaos }) {
    const curves = [];
    const spacing = height / (count + 1);

    for (let i = 0; i < count; i++) {
        const y = spacing * (i + 1);

        const startOffsetX = (Math.random() - 0.5) * xDeviation * 2;
        const endOffsetX = (Math.random() - 0.5) * xDeviation * 2;
        const cp1OffsetY = (Math.random() - 0.5) * yChaos; 
        const cp2OffsetY = (Math.random() - 0.5) * yChaos;
        const cp1OffsetX = (Math.random() - 0.5) * xDeviation;
        const cp2OffsetX = (Math.random() - 0.5) * xDeviation;

        curves.push(new Bezier(
            { x: 0 + startOffsetX, y: y },
            { x: width / 3 + cp1OffsetX, y: y + cp1OffsetY }, 
            { x: width * 2/3 + cp2OffsetX, y: y + cp2OffsetY }, 
            { x: width + endOffsetX, y: y }
        ));
    }

    return curves;
}
export default function HorizontalWavyLines({ setCurves = () => {} }) {
    const [count, setCount] = useState(5);
    const [xDeviation, setXDeviation] = useState(50);
    
    const [yChaos, setYChaos] = useState(0); 

    const handleGenerate = () => {
        const curves = generateHorizontalLines({
            count,
            width: 500,
            height: 500,
            xDeviation,
            yChaos });
        setCurves(curves);
    };

    return (
        <div className="space-y-4">
        <ControlRangeSlider
        setterFunction={setCount}
        labelText="Number of lines"
        min={2}
        max={15}
        defaultValue={5}
        />

        <ControlRangeSlider
        setterFunction={setXDeviation}
        labelText="X Deviation"
        min={0}
        max={150}
        defaultValue={50}
        />
        
        <ControlRangeSlider
        setterFunction={setYChaos}
        labelText="Y Chaos (Waviness)"
        min={0}
        max={1000} 
        defaultValue={0}
        />

        <button
        type='button'
        onClick={handleGenerate}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded w-full"
        >
        Generate!
        </button>
        </div>
    );
}