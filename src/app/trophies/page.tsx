"use client"; // Add this directive for useState

import { useState } from 'react'; // Import useState
import ModelViewer from '@/components/ModelViewer';
import ModelControls from '@/components/ModelControls'; // Import the controls

const PrizePage = () => {
    const modelPath = '/trophies/Ping Pong Man.stl'; // Path relative to the /public directory

    // State for rotation (in radians)
    const [rotation, setRotation] = useState({ x: -Math.PI / 2, y: 0, z: -Math.PI / 2 });

    // Handler for rotation changes from sliders
    const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
        setRotation(prev => ({ ...prev, [axis]: value }));
    };

    const controls = () => {
        return (
            <div className="flex-shrink-0">
                <p className="text-sm text-olive m-2">Localhost Model Controls</p>
                <ModelControls rotation={rotation} onRotationChange={handleRotationChange} />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-150px)]">
            <h1 className="text-4xl font-bold text-skin mb-8 text-center">Trophies</h1>
            <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                 <div className="flex-grow" style={{minWidth: '300px'}}>
                    <ModelViewer modelPath={modelPath} rotation={rotation} />
                 </div>
                 {
                    typeof window !== 'undefined' && window.location.href.includes('localhost')  && (
                        controls()
                    )
                 }
            </div>
        </div>
    )
}

export default PrizePage;