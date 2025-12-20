import { useBezierActions } from "@hooks/useBezierActions";
import { useState } from "react";

export default function SplitCurveButton({ setCurves }) {

  const {splitAllCurves, isPending } = useBezierActions(setCurves);
  const [splitCounter, setSplitCounter] = useState(0)

  const handleClick = () => {
    splitAllCurves() 
    setSplitCounter(prev => prev + 1) 
  }
  return (
  <>
    <button
      className="btn-primary disabled:text-text-muted disabled:active:scale-100" 
      onClick={() => handleClick()} 
      disabled={isPending || splitCounter >= 4} 
    >
      {isPending ? 'Splitting...' : 'Split All Curves '}
    </button> 
    <p className="text-help">
        *For optimization purposes, the number of divisions is limited to 4. The current number of divisions is: {splitCounter}
    </p>
  </>
  
  );
}