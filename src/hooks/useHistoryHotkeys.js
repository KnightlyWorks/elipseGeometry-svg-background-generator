import { useEffect } from 'react';

export function useHistoryHotkeys({ undo, redo, canUndo, canRedo }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const isZ = e.key.toLowerCase() === 'z';
            const isY = e.key.toLowerCase() === 'y';

            if (e.ctrlKey && isZ && !e.shiftKey && canUndo) {
                e.preventDefault();
                undo();
            }
            if ((e.ctrlKey && isY) || (e.ctrlKey && e.shiftKey && isZ)) {
                if (canRedo) {
                    e.preventDefault();
                    redo();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, canUndo, canRedo]);
}
