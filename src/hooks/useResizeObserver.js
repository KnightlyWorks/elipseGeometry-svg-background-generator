import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for getting and tracking the dimensions (width and height) of a DOM element
 * using the native ResizeObserver API.
 * @param {React.MutableRefObject<Element | null>} ref - Ref attached to the observed element.
 * @returns {{ width: number, height: number }} - Object with the current dimensions.
 */ 
 const useResizeObserver = (ref) => {

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleResize = useCallback((entries) => {

        if (entries && entries.length > 0) {

            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        }
    }, []);

    useEffect(() => {
        const currentElement = ref.current;
        if (!currentElement) {
            return;
        }

        const observer = new ResizeObserver(handleResize);

        observer.observe(currentElement);
        return () => {
            observer.unobserve(currentElement);
        };

    }, [ref, handleResize]);

    return dimensions;
};

export default useResizeObserver;


