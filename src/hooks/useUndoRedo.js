import { useState, useCallback } from 'react';

export function useUndoRedo(initialState) {
    const [history, setHistory] = useState([initialState]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentState = history[currentIndex];

    const setState = useCallback((newState) => {
        setHistory(prev => {

            const newHistory = prev.slice(0, currentIndex + 1);
            newHistory.push(newState);

            if (newHistory.length > 50) {
                newHistory.shift(); 
            } else {
                setCurrentIndex(newHistory.length - 1);
            }

            return newHistory;
        });

        if (history.length >= 50) {
            return
        }
    }, [currentIndex, history.length]);

    const undo = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, history.length]);

    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    return {
        state: currentState,
        setState,
        undo,
        redo,
        canUndo,
        canRedo,
    };
}
