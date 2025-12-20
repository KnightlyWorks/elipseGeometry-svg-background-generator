export default function MenuButton ({ children, onClick, isOpen }) {
  const stateClasses = isOpen 
    ? 'bg-surface-hover text-purple-400 shadow-glow border-purple-500/50' 
    : 'bg-[--gradient-primary] text-white hover:shadow-glow hover:scale-105 active:scale-95';

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`relative flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 ${stateClasses}`}
    >
      {children}
    </button>
  );
};