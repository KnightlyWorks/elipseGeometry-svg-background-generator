import clsx from "clsx";
import { useState } from "react";

export default function FieldSetGroup({ legend, children, openByDefault = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [wasOpened, setWasOpened] = useState(openByDefault);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!wasOpened) setWasOpened(true);
  };

    return (
      <fieldset className="border border-default rounded p-4">
      <legend
      onClick={toggleOpen}
      className="cursor-pointer hover:text-purple-400 px-2 flex items-center gap-2 transition-colors"
      >
      <svg
      className={clsx(
        "transition-transform duration-150",
        isOpen ? "rotate-90" : "rotate-0"
      )}
      width="15" height="15" viewBox="0 0 100 100"
      >
      <polygon points="10,10 90,50 10,90" fill="currentColor"/>
      </svg>
      {legend}
      </legend>

      <div className={clsx(
        "grid transition-all duration-300",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
      <div className="overflow-hidden">
    {wasOpened && children}
    </div>
    </div>
    </fieldset>
    );
}
