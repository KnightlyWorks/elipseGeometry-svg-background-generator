import {  useState } from "react"

import ControlRangeSlider from "./controlsElements/widgets/ControlRangeSlider.jsx";
import GridOfPreviews from "./controlsElements/index.jsx";
import FieldSetGroup from "./controlsElements/widgets/FieldSetGroup.jsx";

export default function ControlPanel ({setRadius, setPointsPerCurve, setCurves}) {
    //Pattern generation
    const [GenerationComponent,setGenerationComponent] = useState(null) 
    const [generationComponentModalIsOpen,setGenerationComponentModalIsOpen] = useState(false)

    const closeModal = () => {
      setGenerationComponentModalIsOpen(false)
    }

    return (
    <aside className="bg-background-elevated">
        <form>
          <FieldSetGroup legend={"Quality Settings"}>

            <ControlRangeSlider setterFunction={setRadius} labelText={"Radius of a circle"} min={0} max={800} defaultValue={15} />
            <ControlRangeSlider setterFunction={setPointsPerCurve} labelText={"Points per Curve"} min={2} max={300} defaultValue={50} />
          </FieldSetGroup>
          <FieldSetGroup legend={"Generation"}>
              <div className="space-y-4">
                <button type="button" className="bg-purple-600 hover:bg-purple-700 px-3 m-2 py-1 rounded w-full md:w-3/4 " onClick={() => setGenerationComponentModalIsOpen(prev => !prev)}>Select Pattern Type</button>
                {
                  GenerationComponent ? 
                  <div className="border p-2 rounded">
                  <p>Curret type: <b>{GenerationComponent.name}</b></p>  
                </div>
                : <p>Please select generation pattern type</p>
              }
                {GenerationComponent && (
                  <GenerationComponent setCurves={setCurves} />
                )}
              </div>
          </FieldSetGroup >
            {/*Modal window with selection pattern type*/}
            {generationComponentModalIsOpen && <GridOfPreviews setterFunction={setGenerationComponent} closeModalFunction={closeModal} />}
        </form>
    </aside>)

}


