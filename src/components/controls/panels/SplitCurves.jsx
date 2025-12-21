import { useBezierActions } from "@hooks/useBezierActions";
import { SAFETY_LIMIT_OF_CURVES } from "/src/constants/constants";


export default function SplitCurveButton({ setCurves, curvesLength }) {

  const { splitAllCurves, isPending } = useBezierActions(setCurves);
  
  
  
  const currentCount = curvesLength || 0;
  const isLimitReached = currentCount >= SAFETY_LIMIT_OF_CURVES;

  return (
  <>
    <button
      className="btn-primary" 
      onClick={splitAllCurves} 
      disabled={isPending || isLimitReached} 
    >
      {isPending ? 'Splitting...' : isLimitReached ? 'Max Limit Reached' : 'Split All Curves'}
    </button> 
    
    <p className="text-[10px] text-text-tertiary text-center italic">
       {isLimitReached 
         ? "Optimization limit reached to prevent browser crash." 
         : `Current curves: ${currentCount}. Safe limit: ${SAFETY_LIMIT_OF_CURVES}`
       }
    </p>
  </>
  );
}