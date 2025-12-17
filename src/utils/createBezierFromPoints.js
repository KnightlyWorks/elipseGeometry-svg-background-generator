import { Bezier } from 'bezier-js';

export default function createBezierFromPoints(pts) {
  return new Bezier([
    { x: pts[0], y: pts[1] }, // Start
    { x: pts[2], y: pts[3] }, // CP1
    { x: pts[4], y: pts[5] }, // CP2
    { x: pts[6], y: pts[7] }  // End
  ]);
}