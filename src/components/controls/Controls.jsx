// libraries
import clsx from "clsx";

// React
import { useState } from "react";

//Components
import ControlRangeSlider from "./widgets/ControlRangeSlider.jsx";
import FieldSetGroup from "./widgets/FieldSetGroup.jsx";
import GridOfPreviews from "./patterns/index.jsx";
import PatternSelectionPanel from "./panels/PatternSelectionPanel.jsx";
import BackgroundTransformSettings from "./panels/SvgTransform.jsx";
import Checkbox from "./widgets/Checkbox.jsx";
import GradientEditor from "./panels/GradientEditor.jsx";



export default function ControlPanel({ setRadius, setPointsPerCurve, setCurves, isOpen, setTransformSVG, setChaos, chaos=true, alternating, setAlternating, setActiveStops  }) {
    //Pattern generation
    const [GenerationComponent, setGenerationComponent] = useState(null)
    const [generationComponentModalIsOpen, setGenerationComponentModalIsOpen] = useState(false)

    const closeModal = () => {
        setGenerationComponentModalIsOpen(false)
    }

    return (
        <aside className={clsx("bg-background-elevated w-full h-full overflow-y-scroll border-r border-border custom-scrollbar md:block md:static z-10 md:max-h-screen", isOpen ? 'fixed max-h-4/5' : 'hidden')}>
            <div className="p-4 space-y-6">
                

                <FieldSetGroup legend={"Global Quality"}>
                    <div className="space-y-6 pt-2">
                        <div className="bottom-divider space-y-4">
                            <ControlRangeSlider setterFunction={setRadius} labelText={"Radius"} min={0} max={200} defaultValue={15} />
                            <ControlRangeSlider setterFunction={setPointsPerCurve} labelText={"Resolution (Points)"} min={2} max={300} defaultValue={50} />
                        </div>

                        <div className="panel-card flex flex-col md:flex-row mt-8">
                            <Checkbox label={'Enable Chaos'} isChecked={chaos} setterFunction={setChaos} />
                            <Checkbox label={'Ebalbe Alternating'} isChecked={alternating} setterFunction={setAlternating} />
                        </div>
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

                <FieldSetGroup legend={"Color"}>
                    <GradientEditor onApply={setActiveStops} />
                </FieldSetGroup>

                {/*  selection pattern type */}
                {generationComponentModalIsOpen && (
                    <GridOfPreviews 
                        setterFunction={setGenerationComponent} 
                        closeModalFunction={closeModal} 
                    />
                )}


            </div>
        </aside>
    )
}