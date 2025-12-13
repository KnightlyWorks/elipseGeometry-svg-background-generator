// libraries
import clsx from "clsx";

// React
import { useState } from "react";

//Components
import ControlRangeSlider from "./controlsElements/widgets/ControlRangeSlider.jsx";
import FieldSetGroup from "./controlsElements/widgets/FieldSetGroup.jsx";
import GridOfPreviews from "./controlsElements/index.jsx";
import PatternSelectionPanel from "./controlsElements/settingGroups/PatternSelectionPanel.jsx";
import BackgroundTransformSettings from "./controlsElements/settingGroups/svgTrasform.jsx";




export default function ControlPanel({ setRadius, setPointsPerCurve, setCurves, isOpen, setTransformSVG }) {
    //Pattern generation
    const [GenerationComponent, setGenerationComponent] = useState(null)
    const [generationComponentModalIsOpen, setGenerationComponentModalIsOpen] = useState(false)

    const closeModal = () => {
        setGenerationComponentModalIsOpen(false)
    }

    return (
        <aside className={clsx("bg-background-elevated h-full overflow-y-scroll border-r border-border custom-scrollbar md:block md:static z-10 md:max-h-screen", isOpen ? 'fixed max-h-4/5' : 'hidden')}>
            <form className="p-4 space-y-6">
                

                <FieldSetGroup legend={"Global Quality"}>
                    <div className="space-y-4 pt-2">
                        <ControlRangeSlider setterFunction={setRadius} labelText={"Radius"} min={0} max={200} defaultValue={15} />
                        <ControlRangeSlider setterFunction={setPointsPerCurve} labelText={"Resolution (Points)"} min={2} max={300} defaultValue={50} />
                    </div>
                </FieldSetGroup>

                <FieldSetGroup legend={"Pattern Generator"}>
                    <PatternSelectionPanel 
                        GenerationComponent={GenerationComponent} 
                        setGenerationComponentModalIsOpen={setGenerationComponentModalIsOpen} 
                        setCurves={setCurves} 
                        />
                </FieldSetGroup>

                <FieldSetGroup legend={"Transfrom Background"}>
                    <BackgroundTransformSettings setterFunction={setTransformSVG} />
                </FieldSetGroup>

                {/*  selection pattern type */}
                {generationComponentModalIsOpen && (
                    <GridOfPreviews 
                        setterFunction={setGenerationComponent} 
                        closeModalFunction={closeModal} 
                    />
                )}
            </form>
        </aside>
    )
}