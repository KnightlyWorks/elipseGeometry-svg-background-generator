/**
 * Apply wave transformation to a set of points
 * @param {Array} points - Array of {x, y} coordinates
 * @param {number} radius - Wave amplitude
 * @param {Object} config - Wave configuration
 * @param {number} config.spiralDirection - Direction multiplier (1 or -1)
 * @param {number} config.spiralIntensity - Intensity factor (0-1+)
 * @param {number} config.phaseShift - Phase offset in radians
 * @param {number} config.frequencyMult - Frequency multiplier
 * @returns {Array} Transformed points
 */
export function applyWaveToPoints(points, radius, config) {
    const N = points.length;
    const { spiralDirection, spiralIntensity, phaseShift, frequencyMult } = config;

    return points.map((p, i) => {
        const t = ((2 * Math.PI * i) / N) * frequencyMult * spiralDirection + phaseShift;
        const progressRadius = radius * spiralIntensity * (1 + (i / N) * 0.2 * spiralDirection);

        const offsetX = progressRadius * Math.cos(t);
        const offsetY = progressRadius * Math.sin(t);

        return {
            x: p.x + offsetX,
            y: p.y + offsetY
        };
    });
}

/**
 * Generate wave configuration based on chaos and alternating modes
 * @param {boolean} chaos - Enable random variations
 * @param {boolean} alternating - Enable alternating direction
 * @param {number} index - Curve index for deterministic variations
 * @returns {Object} Wave configuration
 */
export function generateWaveConfig(chaos, alternating, index) {
    const baseDirection = alternating ? (index % 2 === 0 ? 1 : -1) : 1;

    if (chaos) {
        return {
            spiralDirection: (Math.random() > 0.5 ? 1 : -1) * (alternating ? baseDirection : 1),
            spiralIntensity: 0.95 + Math.random() * 0.1,
            phaseShift: Math.random() * Math.PI * 2,
            frequencyMult: 0.8 + Math.random() * 0.4
        };
    }

    return {
        spiralDirection: baseDirection,
        spiralIntensity: 1,
        phaseShift: index * 0.5,
        frequencyMult: 1
    };
}
