import clsx from "clsx";
import { useState } from "react";


//UI
import GlobalSettings from "./panels/GlobalSettings.jsx";
import FieldSetGroup from "@widgets/FieldSetGroup.jsx";
import BackgroundTransformSettings from "./panels/SvgTransform.jsx";
import GradientEditor from "./panels/GradientEditor.jsx";
import PatternSelectionPanel from "./panels/PatternSelectionPanel.jsx";
import GridOfPreviews from "./patterns/index.jsx";
import SplitCurveButton from "./panels/SplitCurves.jsx";

export default function ControlPanel({ 
  transformSvgConfig,
  globalQualityConfig, 
  getGenSetter, 
  getTransformSetter,  
  setCurves, //for split only
  isOpen,  
  setActiveStops,
  onGenerateNew, // for generation only
  curveVersion
}) {
    const [GenerationComponent, setGenerationComponent] = useState(null);
    const [generationComponentModalIsOpen, setGenerationComponentModalIsOpen] = useState(false);

    const closeModal = () => setGenerationComponentModalIsOpen(false);

    return (
        <aside className={clsx(
            "bg-background-elevated w-full h-full overflow-y-scroll border-r border-border custom-scrollbar md:block md:static z-10 md:max-h-screen", 
            isOpen ? 'fixed max-h-[80%]' : 'hidden'
        )}>
            <div className="p-1 lg:p-4 space-y-6">
                
                <FieldSetGroup  legend={"Global Quality"}>
                    <div className="space-y-6">
                        <GlobalSettings config={globalQualityConfig} getSetter={getGenSetter} />
                        <SplitCurveButton key={curveVersion} setCurves={setCurves} curveVersion={curveVersion} />
                    </div>
                </FieldSetGroup>

                <FieldSetGroup legend={"Pattern Generator"}>
                    <PatternSelectionPanel 
                        GenerationComponent={GenerationComponent} 
                        setGenerationComponentModalIsOpen={setGenerationComponentModalIsOpen} 
                        setCurves={onGenerateNew} 
                    />
                </FieldSetGroup>

                <FieldSetGroup legend={"Transfrom Background"}>
                    <BackgroundTransformSettings config={transformSvgConfig} getSetter={getTransformSetter} />
                </FieldSetGroup>

                <FieldSetGroup legend={"Color"}>
                    <GradientEditor onApply={setActiveStops} />
                </FieldSetGroup>

                {generationComponentModalIsOpen && (
                    <GridOfPreviews 
                        setterFunction={setGenerationComponent} 
                        closeModalFunction={closeModal} 
                    />
                )}
            </div>
        </aside>
    );
}