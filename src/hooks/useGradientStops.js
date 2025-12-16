import { useMemo } from 'react';
import { parse } from 'gradient-parser';

export default function useGradientStops (cssGradient) {
    return useMemo(() => {
        try {
            if (!cssGradient) return [];

            const cleanGradient = cssGradient.replace(/;/g, '');
            const parsed = parse(cleanGradient);
            const gradientNode = parsed?.[0];

            if (gradientNode?.type !== 'linear-gradient') return [];

            const totalStops = gradientNode.colorStops.length;

            return gradientNode.colorStops.map((stop, index) => {
                const { type, value, length } = stop;

                let color = 'black';
                if (type === 'hex') color = `#${value}`;
                else if (type === 'literal') color = value;
                else if (type.includes('rgb')) color = `rgb(${value.slice(0, 3).join(',')})`;

                const opacity = value?.[3] ?? 1;

                const offset = length?.type === '%'
                ? `${length.value}%`
                : `${(index / (totalStops - 1)) * 100}%`;

                return { offset, color, opacity };
            });
        } catch (e) {
            console.warn("Gradient parsing failed:", e);
            return [];
        }
    }, [cssGradient]);
};
