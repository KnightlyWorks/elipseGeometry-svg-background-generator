export default  function HistoryControls ({ undo, redo, canUndo, canRedo }) {
    
    
    return  <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
    <button 
      onClick={undo} 
      disabled={!canUndo} 
      className="size-10 flex items-center justify-center rounded-md transition text-secondary hover:bg-surface-hover disabled:opacity-20" 
      title="Undo (Ctrl+Z)"
    >
      <span>⟲</span>
    </button>
    <button 
      onClick={redo} 
      disabled={!canRedo} 
      className="size-10 flex items-center justify-center rounded-md transition text-secondary hover:bg-surface-hover disabled:opacity-20" 
      title="Redo (Ctrl+Y)"
    >
      <span>⟳</span>
    </button>
  </div>
}