'use client';

import React from 'react';

interface ModelControlsProps {
  rotation: { x: number; y: number; z: number };
  onRotationChange: (axis: 'x' | 'y' | 'z', value: number) => void;
}

const ModelControls: React.FC<ModelControlsProps> = ({ rotation, onRotationChange }) => {
  const handleSliderChange = (axis: 'x' | 'y' | 'z', event: React.ChangeEvent<HTMLInputElement>) => {
    onRotationChange(axis, parseFloat(event.target.value));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow w-64 flex flex-col space-y-4">
      <h3 className="text-lg font-semibold mb-2 text-center">Rotate Model</h3>

      {/* X Rotation */}
      <div className="flex flex-col">
        <label htmlFor="rotateX" className="mb-1 text-sm font-medium text-gray-700">X-Axis: {Math.round(rotation.x * 180 / Math.PI)}°</label>
        <input
          type="range"
          id="rotateX"
          min="-3.14159" // -PI
          max="3.14159"  // +PI
          step="0.01"
          value={rotation.x}
          onChange={(e) => handleSliderChange('x', e)}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Y Rotation */}
      <div className="flex flex-col">
        <label htmlFor="rotateY" className="mb-1 text-sm font-medium text-gray-700">Y-Axis: {Math.round(rotation.y * 180 / Math.PI)}°</label>
        <input
          type="range"
          id="rotateY"
          min="-3.14159"
          max="3.14159"
          step="0.01"
          value={rotation.y}
          onChange={(e) => handleSliderChange('y', e)}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Z Rotation */}
      <div className="flex flex-col">
        <label htmlFor="rotateZ" className="mb-1 text-sm font-medium text-gray-700">Z-Axis: {Math.round(rotation.z * 180 / Math.PI)}°</label>
        <input
          type="range"
          id="rotateZ"
          min="-3.14159"
          max="3.14159"
          step="0.01"
          value={rotation.z}
          onChange={(e) => handleSliderChange('z', e)}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ModelControls;