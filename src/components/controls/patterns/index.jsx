// index.jsx
import PlaceholderImage from '@assets/patternsPreviews/Placeholder.webp';
import camelCaseToSpaced from '@utils/camelCaseToSpaced';

const patternModules = import.meta.glob('./*.jsx', { eager: true });
const patternImages = import.meta.glob('@assets/patternsPreviews/*.{png,jpg,jpeg,webp,svg}', { eager: true, as: 'url' });

function getComponentNameFromPath(path) {
  return path.split('/').pop().replace(/\.\w+$/, '');
}

function PreviewCard({ path, setterFunction, closeModalFunction }) {
  const componentName = getComponentNameFromPath(path);
  const PatternComponent = patternModules[path]?.default;

  if (typeof PatternComponent !== 'function') {
    return null;
  }

  const matchingImageKey = Object.keys(patternImages).find(imgKey => {
    const imgName = getComponentNameFromPath(imgKey);
    return imgName === componentName;
  });

  const finalImageSrc = matchingImageKey ? patternImages[matchingImageKey] : PlaceholderImage;

  const handleSelect = () => {
    setterFunction(() => PatternComponent);
    closeModalFunction();
  }

  return (
    <button
      onClick={handleSelect}
      className='
        group text-left relative flex flex-col
        rounded-xl overflow-hidden border border-surface-2 bg-surface
        transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]
        hover:-translate-y-1
      '
    >
      <div className="aspect-video w-full bg-background-elevated relative overflow-hidden p-2">
        {/* Subtle grid background. transparent images */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4b5563_1px,transparent_1px)] bg-size-[16px_16px]"></div>
        
        <img
          src={finalImageSrc}
          alt={componentName}
          className="relative z-10 object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/10 transition-colors z-20" />
      </div>

      <div className="p-4 w-full border-t border-surface-2 group-hover:border-purple-500/30">
        <h2 className="text-sm font-semibold text-text group-hover:text-purple-300 transition-colors">
          {camelCaseToSpaced(componentName)}
        </h2>
        <p className='text-xs text-text-muted mt-1'>Click to apply pattern</p>
      </div>
    </button>
  );
}

export default function GridOfPreviews({ setterFunction, closeModalFunction }) {
  const componentPaths = Object.keys(patternModules).filter(path => !path.includes('/index.'));
  const previewCards = componentPaths.map(path => (
    <PreviewCard 
        key={path} 
        path={path} 
        setterFunction={setterFunction} 
        closeModalFunction={closeModalFunction}
    />
  ));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity" 
            onClick={closeModalFunction}
        />

        <article
        role='dialog'
        aria-modal='true'
        className="
            relative z-10
            w-full max-w-5xl h-[85vh]
            bg-surface border border-border
            shadow-2xl rounded-2xl
            flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200
        "
        >
        <header className='flex justify-between items-center p-6 border-b border-border bg-surface/50 backdrop-blur-sm'>
            <div>
                <h2 className="text-xl font-bold text-text bg-clip-text  bg-[image:--gradient-primary]">
                Select Pattern
                </h2>
                <p className="text-xs text-text-secondary mt-1">Choose a generative algorithm to start creating</p>
            </div>
            
            <button 
            className='p-2 rounded-lg hover:bg-surface-hover text-text-tertiary hover:text-white transition-colors' 
            type='button' 
            onClick={closeModalFunction}
            aria-label='Close'
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </header>

        <div className="
            overflow-y-auto p-6
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 
            custom-scrollbar
        ">
            {previewCards}
        </div>
        </article>
    </div>
  );
}