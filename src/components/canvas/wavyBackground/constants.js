import createBezierFromPoints from '@utils/createBezierFromPoints'

export const CURVE_POINTS = [
    [40, 40, 20, 160, 40, 320, 80, 360],
[80, 360, 120, 360, 160, 200, 200, 120],
[200, 120, 240, 200, 280, 360, 320, 360],
[320, 360, 360, 360, 380, 160, 360, 40],
[360, 40, 400, 40, 420, 80, 410, 100],
[410, 100, 390, 280, 360, 380, 320, 380],
[320, 380, 280, 380, 250, 240, 210, 280],
[210, 280, 170, 320, 120, 380, 80, 380],
[80, 380, 40, 380, 10, 280, 10, 100],
[10, 100, 10, 60, 40, 40, 40, 40]
];

export const DEFAULT_BEZIER_CURVES = CURVE_POINTS.map(createBezierFromPoints);

export const MAIN_GRADIENT_ID = 'Main-svg-gradient';
