// index.jsx
import PlaceholderImage from '../assets/patternsPreviews/Placeholder.webp';
import CloseIcon from '../assets/close.svg';

const patternModules = import.meta.glob('./*.jsx', { eager: true });
const patternImages = import.meta.glob('./assets/patternsPreviews/*.{png,jpg,jpeg,webp,svg}', { eager: true, as: 'url' });

function getComponentNameFromPath(path) {
  return path.split('/').pop().replace(/\.\w+$/, '');
}

const camelCaseToSpaced = (camelCaseString) => {
  let result = camelCaseString.replace(/([A-Z])/g, ' $1');
  return result.trim();
};

function PreviewCard({ path, setterFunction }) {
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

  return (
    <figure
      className='
        rounded-lg overflow-hidden border border-surface-2
        transition-shadow duration-200 hover:shadow-lg hover:shadow-purple-500/20
        cursor-pointer
      '
    >
      <div className="aspect-square bg-surface-1 flex items-center justify-center overflow-hidden relative p-4">
        <img
          src={finalImageSrc}
          alt={`Превью паттерна: ${componentName}`}
          className="object-contain w-full h-full max-h-full"
        />
      </div>

      <figcaption className="flex w-full justify-between items-center p-4 bg-surface-2 border-t border-surface-2">
        <h2 className="text-base font-semibold text-text-primary">
          {camelCaseToSpaced(componentName)}
        </h2>
        <button
          type="button"
          onClick={() => setterFunction(() => PatternComponent)}
          className="
            bg-purple-600 px-4 py-2 rounded-full text-sm font-medium text-white
            hover:bg-purple-700 active:bg-purple-800
            transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          "
        >
          Apply
        </button>
      </figcaption>
    </figure>
  );
}

export default function GridOfPreviews({ setterFunction, closeModalFunction }) {
  const componentPaths = Object.keys(patternModules).filter(path => !path.includes('/index.'));
  const previewCards = componentPaths.map(path => (
    <PreviewCard key={path} path={path} setterFunction={setterFunction} />
  ));

  return (
    <article
      role='dialog'
      aria-modal='true'
      className="
        fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        w-11/12 max-w-4xl h-[90vh]
        bg-gradient-to-br from-surface/95 to-surface/90 backdrop-blur-sm
        shadow-2xl rounded-xl
        flex flex-col
      "
    >
      <header className='flex justify-between items-center p-6 border-b border-surface-2'>
        <h2 className="text-2xl font-bold text-text-primary">Select Pattern</h2>
        <button 
          className='size-8 p-2 rounded-full hover:bg-surface-3 transition-colors' 
          type='button' 
          onClick={closeModalFunction}
          aria-label='Закрыть модальное окно'
        >
          <img src={CloseIcon} alt='Закрыть' />
        </button>
      </header>

      {/* Scrollable container */}
      <div className="
        overflow-y-scroll p-6
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 auto-rows-max
        content-start
      ">
        {previewCards}
      </div>
    </article>
  );
}