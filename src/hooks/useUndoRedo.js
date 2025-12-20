import { useReducer } from 'react';

const MAX_HISTORY = 50;

function undoRedoReducer(state, action) {
  const { history, index } = state;

  switch (action.type) {
    case 'SET': {
      const resolvedState = typeof action.payload === 'function'
        ? action.payload(history[index])
        : action.payload;

      if (resolvedState === history[index]) {
        return state;
      }
      const nextHistory = [...history.slice(0, index + 1), resolvedState];

      if (nextHistory.length > MAX_HISTORY) {
        nextHistory.shift(); 
      }

      return {
        history: nextHistory,
        index: nextHistory.length - 1,
      };
    }

    case 'UNDO': {
      if (index <= 0) return state;
      return {
        ...state,
        index: index - 1,
      };
    }

    case 'REDO': {
      if (index >= history.length - 1) return state;
      return {
        ...state,
        index: index + 1,
      };
    }

    case 'RESET': {
      return {
        history: [action.payload],
        index: 0
      };
    }

    default:
      return state;
  }
}

export function useUndoRedo(initialState) {
  const [state, dispatch] = useReducer(undoRedoReducer, {
    history: [initialState],
    index: 0,
  });

  const setState = (newState) => dispatch({ type: 'SET', payload: newState });
  const undo = () => dispatch({ type: 'UNDO' });
  const redo = () => dispatch({ type: 'REDO' });
  const reset = (payload) => dispatch({ type: 'RESET', payload });

  return {
    state: state.history[state.index],
    setState,   
    undo,
    redo,
    reset, 
    history: state.history, 
    canUndo: state.index > 0,
    canRedo: state.index < state.history.length - 1,
  };
}