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

  const num = (name) => parseFloat(el.getAttribute(name)) || 0;

  switch (tag) {
    case 'path':
      return el.getAttribute('d') || '';
    case 'rect': {
      const x = num('x'), y = num('y'), w = num('width'), h = num('height');

      return `M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`;
    }
    case 'circle': {
      const cx = num('cx'), cy = num('cy'), r = num('r');
      return `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 -${r * 2},0`;
    }
    case 'ellipse': {
      const cx = num('cx'), cy = num('cy'), rx = num('rx'), ry = num('ry');
      return `M${cx - rx},${cy} a${rx},${ry} 0 1,0 ${rx * 2},0 a${rx},${ry} 0 1,0 -${rx * 2},0`;
    }
    case 'line': {
      return `M${num('x1')},${num('y1')} L${num('x2')},${num('y2')}`;
    }
    case 'polygon':
    case 'polyline': {
      const points = (el.getAttribute('points') || '').trim().split(/[\s,]+/).map(Number);
      if (points.length < 4) return '';
      let d = `M${points[0]},${points[1]}`;
      for (let i = 2; i < points.length; i += 2) {
        d += ` L${points[i]},${points[i+1]}`;
      }
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

    let subpathStartX = 0;
    let subpathStartY = 0;

    svgpath(d)
      .transform(transform)
      .abs()
      .unshort()
      .unarc()
      .iterate((seg, _, startX, startY) => {
        const [cmd, ...args] = seg;
        let cubicParams = null;

        if (cmd === 'M') {

          subpathStartX = args[0];
          subpathStartY = args[1];
          return;
        }

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
        else if (cmd === 'Z') {
          if (startX !== subpathStartX || startY !== subpathStartY) {
            cubicParams = [startX, startY, subpathStartX, subpathStartY, subpathStartX, subpathStartY];
          }
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
