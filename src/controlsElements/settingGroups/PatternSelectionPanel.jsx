import camelCaseToSpaced from "../../supportFunctions/camelCaseToSpaced";



export default function PatternSelectionPanel({ GenerationComponent, setGenerationComponentModalIsOpen, setCurves }) {
  return (
    <div className="space-y-4 pt-2">
      <button
        type="button"
        className="btn-secondary flex items-center justify-center gap-2 group"
        onClick={() => setGenerationComponentModalIsOpen(prev => !prev)}
      >
        <span>{GenerationComponent ? "Change Pattern" : "Select Pattern"}</span>
        <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

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
