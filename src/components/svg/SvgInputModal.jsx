import Prism from 'prismjs/components/prism-core';

if (typeof window !== 'undefined') {
  window.Prism = Prism;
}
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import svgpath from 'svgpath';
import createBezierFromPoints from '@utils/createBezierFromPoints';
import React, { useState } from 'react';
import SvgEditorModal from './SvgEditorModal'; 

const q2c = (p1, p2) => p1 + (2 / 3) * (p2 - p1);

const elementToPath = (el) => {
  const tag = el.tagName.toLowerCase();
  const attr = (name) => el.getAttribute(name) || '0';

  switch (tag) {
    case 'path':
      return attr('d');
    case 'rect': {
      const x = attr('x'), y = attr('y'), w = attr('width'), h = attr('height');
      return `M${x},${y} h${w} v${h} h-${w} Z`;
    }
    case 'circle': {
      const cx = attr('cx'), cy = attr('cy'), r = attr('r');
      return `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 -${r * 2},0`;
    }
    case 'ellipse': {
      const cx = attr('cx'), cy = attr('cy'), rx = attr('rx'), ry = attr('ry');
      return `M${cx - rx},${cy} a${rx},${ry} 0 1,0 ${rx * 2},0 a${rx},${ry} 0 1,0 -${rx * 2},0`;
    }
    case 'line': {
      return `M${attr('x1')},${attr('y1')} L${attr('x2')},${attr('y2')}`;
    }
    case 'polygon':
    case 'polyline': {
      const points = (attr('points').match(/-?[\d.]+/g) || []);
      if (points.length < 2) return '';
      const d = `M${points.join(' ')}`; 
      return tag === 'polygon' ? d + ' Z' : d;
    }
    default:
      return '';
  }
};


export default function ImportMenu ({ onApply, closeModal }) {
  const [code, setCode] = useState(
    `<svg>
  <rect x="10" y="10" width="100" height="50" />
  <circle cx="200" cy="50" r="40" />
  <path d="M40 40 Q 20 160 40 320 T 80 360" />
</svg>`
  );

  const processSvg = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "image/svg+xml");
    const curves = [];
    const selector = "path, rect, circle, ellipse, line, polyline, polygon";
    
    doc.querySelectorAll(selector).forEach(el => {
      const d = elementToPath(el);
      const transform = el.getAttribute('transform') || '';
      
      if (!d) return;

      svgpath(d)
        .transform(transform) 
        .abs()
        .unshort()
        .unarc()
        .iterate((seg, _, startX, startY) => {
          const [cmd, ...args] = seg;
          let cubicParams = null; 

          if (cmd === 'C') { 
            cubicParams = args;
          } 
          else if (cmd === 'Q') { 
            const [qx, qy, endX, endY] = args;
            cubicParams = [
              q2c(startX, qx), q2c(startY, qy),
              q2c(endX, qx),   q2c(endY, qy),
              endX, endY
            ];
          } 
          else if (cmd === 'L') { 
            const [endX, endY] = args;
            cubicParams = [startX, startY, endX, endY, endX, endY];
          }

          if (cubicParams) {
            curves.push(createBezierFromPoints([startX, startY, ...cubicParams]));
          }
        });
    });

    onApply?.(curves);
  };

  return (
    <SvgEditorModal
      title="Import Geometry"
      code={code}
      setCode={setCode}
      closeModal={closeModal}
      actions={
        <button 
          onClick={processSvg}
          className="px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white text-[10px] uppercase font-bold rounded transition-colors"
        >
          Apply Path
        </button>
      }
    />
  );
};