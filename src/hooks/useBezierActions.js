import { useCallback, useTransition } from 'react';
import { Bezier } from "bezier-js";
import splitCubicBezier from "@utils/splitCubicBezier";

export function useBezierActions(setCurves) {
    const [isPending, startTransition] = useTransition();

    const splitAllCurves = useCallback(() => {
        startTransition(() => {
            setCurves((prevCurves) => {
                if (!prevCurves || !Array.isArray(prevCurves)) {
                    console.warn("State 'curves' is undefined or not an array.");
                    return [];
                }

                return prevCurves.flatMap((bezierInstance) => {
                    if (!bezierInstance || !bezierInstance.points) return [];

                    const { points } = bezierInstance;

                    const rawCurve = {
                        p0: points[0],
                        p1: points[1],
                        p2: points[2],
                        p3: points[3]
                    };

                    const [leftMath, rightMath] = splitCubicBezier(rawCurve, 0.5);

                    const leftCurve = new Bezier(
                        leftMath.p0.x, leftMath.p0.y,
                        leftMath.p1.x, leftMath.p1.y,
                        leftMath.p2.x, leftMath.p2.y,
                        leftMath.p3.x, leftMath.p3.y
                    );

                    const rightCurve = new Bezier(
                        rightMath.p0.x, rightMath.p0.y,
                        rightMath.p1.x, rightMath.p1.y,
                        rightMath.p2.x, rightMath.p2.y,
                        rightMath.p3.x, rightMath.p3.y
                    );

                    return [leftCurve, rightCurve];
                });
            });
        });
    }, [setCurves]);

    return { splitAllCurves, isPending };
}
