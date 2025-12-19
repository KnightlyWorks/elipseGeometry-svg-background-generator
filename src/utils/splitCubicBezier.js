// Helper function for linear interpolation (Lerp)
// Using an arrow function for conciseness and parentheses () for implicit return
const lerp = (p1, p2, t) => ({
  x: p1.x + (p2.x - p1.x) * t,
  y: p1.y + (p2.y - p1.y) * t
});

/**
 * Splits a cubic Bezier curve into two separate curves using De Casteljau's algorithm.
 * @param {Object} curve - Object containing points p0, p1, p2, p3
 * @param {number} t - Split coefficient (from 0 to 1)
 */
export default function splitCubicBezier(curve, t = 0.5) {
  const { p0, p1, p2, p3 } = curve;

  // First level of interpolation
  const q0 = lerp(p0, p1, t);
  const q1 = lerp(p1, p2, t);
  const q2 = lerp(p2, p3, t);

  // Second level of interpolation
  const r0 = lerp(q0, q1, t);
  const r1 = lerp(q1, q2, t);

  // Final point on the curve
  const s = lerp(r0, r1, t);

  return [
    { p0, p1: q0, p2: r0, p3: s }, // Left sub-curve
    { p0: s, p1: r1, p2: q2, p3 }  // Right sub-curve
  ];
}