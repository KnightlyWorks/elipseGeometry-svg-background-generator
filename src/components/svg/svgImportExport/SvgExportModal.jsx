import React, { useState, useEffect } from 'react';
import SvgEditorModal from './SvgEditorModal';

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
        <button 
          onClick={copyToClipboard}
          className="px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white text-[10px] uppercase font-bold rounded transition-colors"
        >
          Copy Code
        </button>
      }
    />
  );
};