import React, { useState, useEffect } from 'react';
import SvgEditorModal from './SvgEditorModal';
import 'prismjs/components/prism-markup';
import ToolTip from '@components/widgets/tooltips/Tooltip';

export default function ExportMenu ({ svgCode = '', closeModal }) {
  const [code, setCode] = useState(svgCode);

  useEffect(() => {
    setCode(svgCode);
  }, [svgCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <SvgEditorModal
      title="Export Geometry"
      code={code}
      setCode={setCode}
      closeModal={closeModal}
      actions={
        <div>
          <button 
            onClick={copyToClipboard}
            className="px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white text-[10px] uppercase font-bold rounded transition-colors"
          >
            Copy Code 
          </button> 
          {svgCode.length > 30000 &&<ToolTip text='Tip: This export may be heavy for complex shapes. Running it through SVGO can greatly reduce file size.' /> } 
        </div>
        
      }
    />
  );
};