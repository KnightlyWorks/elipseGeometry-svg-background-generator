import { useState } from 'react';
import { 
  useFloating, 
  autoUpdate, 
  offset, 
  flip, 
  shift, 
  useHover, 
  useInteractions,
} from '@floating-ui/react';

export default function ToolTip({ text = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,             
    onOpenChange: setIsOpen,  
    placement: "top",         
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),  
      shift({ padding: 5 })    
    ] 
  });

  const { setReference, setFloating } = refs;
  const hover = useHover(context, { delay: { open: 100, close: 100 } });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  if (!text) return null;

  return (
    <>
      <span 
        ref={setReference}  
        {...getReferenceProps()} 
        className="inline-flex items-center justify-center w-4 h-4 ml-1.5 
                   text-[10px] font-bold text-purple-400 border border-purple-500/40 
                   rounded-full cursor-help transition-all duration-200
                   hover:bg-purple-500/10 hover:border-purple-500 hover:shadow-[0_0_8px_rgba(168,85,247,0.4)]"
      >
        ?
      </span>

      {isOpen && (
        <div 
          ref={setFloating} 
          style={floatingStyles} 
          {...getFloatingProps()} 
          className="z-50 w-52 p-3 text-[11px] leading-relaxed
                     bg-background-elevated border border-purple-500/30 
                     text-text-secondary rounded-lg shadow-glow backdrop-blur-md
                     pointer-events-none animate-in fade-in zoom-in-95 duration-200"
        >
          {text}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background-elevated border-r border-b border-purple-500/30 rotate-45" />
        </div>
      )}
    </>
  );
}