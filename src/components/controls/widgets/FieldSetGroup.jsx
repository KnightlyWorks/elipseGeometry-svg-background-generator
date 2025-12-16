import clsx from "clsx";
import { useState } from "react";


export default function FieldSetGroup({ legend, children }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <fieldset className="border border-default rounded pX-2 PY-4">
      <legend 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:text-purple-400 px-2 flex items-center gap-2"
      >
        <svg 
          className={clsx(
            "transition-transform duration-150",
            isOpen ? "rotate-90" : "rotate-0"
          )} 
          width="15" 
          height="15" 
          viewBox="0 0 100 100"
        >
          <polygon 
            points="10,10 90,50 10,90" 
            fill="currentColor"
          />
        </svg>
        {legend}
      </legend>
      {/*0fr --- closed, 1fr --- open */}
      <div className={clsx(
        "grid transition-all duration-300",
        isOpen ? "grid-rows-[1fr] scale-y-100" : "grid-rows-[0fr] scale-y-10"
      )}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </fieldset>
  );
}