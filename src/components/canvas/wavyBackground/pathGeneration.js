import { applyWaveToPoints, generateWaveConfig } from './waveTransforms';

/**
 * Build SVG path string from array of points
 * @param {Array} points - Array of {x, y} coordinates
 * @returns {string} SVG path data string
 */
export function buildLinearPath(points) {
    if (!points.length) return '';

    const round = (num) => num.toFixed(1);
    let d = `M${round(points[0].x)} ${round(points[0].y)}`;

    for (let i = 1; i < points.length; i++) {
        d += ` L${round(points[i].x)} ${round(points[i].y)}`;
    }

    return d;
}

/**
 * Generate two optimized SVG paths from Bezier curves
 * @param {Array} curves - Array of Bezier curve objects
 * @param {number} radius - Wave amplitude
 * @param {number} steps - Number of points per curve
 * @param {boolean} chaos - Enable random variations
 * @param {boolean} alternating - Enable alternating direction
 * @returns {Object} Object with path1 and path2 strings
 */
export function generateOptimizedPaths(curves, radius, steps, chaos, alternating) {
    const allPaths1 = [];
    const allPaths2 = [];

    curves.forEach((curve, index) => {
        const points = curve.getLUT(steps);
        const config = generateWaveConfig(chaos, alternating, index);

        const wavyPoints1 = applyWaveToPoints(points, radius, config);
        const wavyPoints2 = applyWaveToPoints(points, -radius, config);

        allPaths1.push(buildLinearPath(wavyPoints1));
        allPaths2.push(buildLinearPath(wavyPoints2));
    });

    return {
        path1: allPaths1.join(' '),
        path2: allPaths2.join(' ')
    };
}
