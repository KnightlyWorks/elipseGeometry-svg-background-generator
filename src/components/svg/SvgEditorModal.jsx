import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import CloseIcon from '@assets/close-icon.svg';

export default function SvgEditorModal  ({ 
  title, 
  code, 
  setCode, 
  closeModal, 
  actions 
}) {
  return (
    <div id='paste-modal' role='dialog' className="w-screen left-0 top-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 md:w-[50ch] bg-background-elevated border border-purple-700/20 rounded-xl overflow-hidden shadow-lg shadow-purple-900/20 fixed z-50">
      <div>
        <header className="bg-purple-900/20 px-4 py-2 border-b border-purple-700/30 flex justify-between items-center">
          <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
            {title}
          </span>
          <div className='flex items-center gap-6'>
            {actions}
            
            <button 
              onClick={closeModal} 
              className='self-end btn-primary w-fit mb-2 p-1 rounded-full' 
              aria-label='close dialog'
            >
               <img src={CloseIcon} alt="Close" />
            </button>
          </div>
        </header>
        
        <div className="p-2 font-mono text-sm h-64 overflow-auto custom-scrollbar bg-[#1d1f21]">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => highlight(code, languages.markup)}
            padding={15}
            className="min-h-full outline-none text-text"
            style={{ fontFamily: '"Fira code", monospace', fontSize: 13 }}
          />
        </div>
      </div>
    </div>
  );
};