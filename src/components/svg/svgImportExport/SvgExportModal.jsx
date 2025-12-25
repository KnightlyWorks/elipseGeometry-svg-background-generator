import React, { useState, useEffect } from 'react';
import SvgEditorModal from './SvgEditorModal';
import ToolTip from '@components/widgets/tooltips/Tooltip';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import CopyIcon from '@assets/copy.svg'
import DownloadIcon from '@assets/download..svg'

export default function ExportMenu ({ svgCode = '', closeModal }) {
  const [code, setCode] = useState(svgCode);

  useEffect(() => {
    setCode(svgCode);
  }, [svgCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadSvg = () => {
    const blob = new Blob([code], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wavic-pattern-${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SvgEditorModal
      title="Export Geometry"
      code={code}
      setCode={setCode}
      closeModal={closeModal}
      actions={
        <div className="flex items-center gap-2">
          <button 
            onClick={copyToClipboard}
            className=" flex items-center px-3 py-1 bg-purple-700 hocus:bg-purple-600 text-text text-[10px] uppercase font-bold rounded transition-colors"
          >
            <img className='size-4' src={CopyIcon} alt='copy icon' />
            Copy Code 
          </button> 
          <button 
            onClick={downloadSvg}
            className="flex py-1 px-3 items-center bg-pink-600 hocus:bg-pink-400 text-text text-[10px] uppercase font-bold rounded transition-colors border border-white/5"
          >
            <img className='size-4' src={DownloadIcon} alt='download icon' />
            Download SVG
          </button> 
          {svgCode.length > 30000 && <ToolTip text='Tip: This export may be heavy for complex shapes. Running it through SVGO can greatly reduce file size.' /> } 
        </div>
      }
    />
  );
};