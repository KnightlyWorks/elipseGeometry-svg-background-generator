import Checkbox from "@components/widgets/Checkbox";
import camelCaseToSpaced from "@utils/camelCaseToSpaced";
import { useState, useEffect } from "react";



export default function PatternSelectionPanel({ GenerationComponent, setGenerationComponentModalIsOpen, setCurves }) {
  const wasSelected = Boolean(GenerationComponent); 
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [doNotRemindMe, setDoNotRemindMe] = useState(() => {
    const savedState = localStorage.getItem('doNotRemindMe');
    return JSON.parse(savedState) ?? false
  });


  useEffect(() => {
    localStorage.setItem('doNotRemindMe', JSON.stringify(doNotRemindMe));
  }, [doNotRemindMe]);

  const handleGenerationComponent = () => {
    if(!wasSelected || doNotRemindMe) {
       setGenerationComponentModalIsOpen(prev => !prev)
    } else {
      setConfirmModalOpen(true)
    }
  }

  const handleConfirmModal = ({isConfirm = false}) => {
    if(isConfirm) {
      setConfirmModalOpen(false)
      setGenerationComponentModalIsOpen(prev => !prev)
      return ;
    }
    setConfirmModalOpen(false)
  }

  return (
    <div className="space-y-4 pt-2">
      <button
        type="button"
        className="btn-secondary flex items-center justify-center gap-2 group"
        onClick={() => handleGenerationComponent()}
      >
        <span>{GenerationComponent ? "Change Pattern" : "Select Pattern"}</span>
        <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {confirmModalOpen && <ConfirmModal setDoNotRemindMe={setDoNotRemindMe} doNotRemindMe={doNotRemindMe} onApply={handleConfirmModal} />}

      <div className={`panel-card relative ${!GenerationComponent ? 'border-dashed border-gray-700 bg-transparent' : ''}`}>
        {GenerationComponent ? (
          <>
            <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
              <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Active</span>
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {camelCaseToSpaced(GenerationComponent.name)}
            </h3>
            <p className="text-xs text-text-tertiary">Adjust parameters below to update curves.</p>

            <div className="mt-4 pt-4 border-t border-border/50"> 
              <GenerationComponent setCurves={setCurves} />
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-text-muted">
            <p className="text-sm">No pattern selected.</p>
            <p className="text-xs opacity-60 mt-1">Choose a pattern to begin generation.</p>
          </div>
        )}
      </div>
    </div>
  );
}


function ConfirmModal ({onApply, doNotRemindMe, setDoNotRemindMe }) {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50">
      <div className="p-8 rounded-2xl flex flex-col max-w-sm w-full gap-6 shadow-2xl border border-white/10">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-text">Wait a second</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Changing the pattern will <span className="text-text font-medium">reset all your current adjustments</span>. Are you sure?
          </p>
        </div>

        <div className="panel-card py-2">
           <Checkbox 
             isChecked={doNotRemindMe} 
             setterFunction={setDoNotRemindMe} 
             label="Don't show this again" 
             className="text-xs text-text-tertiary"
           />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => onApply({isConfirm: false})} 
            className="btn-primary"
          >
            Cancel
          </button>
          <button 
            onClick={() => onApply({isConfirm: true})} 
            className="btn-secondary"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  )
}