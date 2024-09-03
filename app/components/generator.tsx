"use client"

import { useEffect, useRef, useState } from 'react';
import ControlPanel from './controller';
import { generatePattern } from './patterns';

export default function PatternGenerator() {
  const [patternType, setPatternType] = useState('mandelbrot');
  const [colors, setColors] = useState(['#ff0000', '#00ff00', '#0000ff']);
  const [variable, setVariable] = useState(1);
  const [randomness, setRandomness] = useState(0);
  const [distortion, setDistortion] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      generatePattern(canvas, patternType, colors, variable, randomness, distortion);
    }
  }, [patternType, colors, variable, randomness, distortion]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pattern.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 font-sans max-w-full mx-auto">
      <canvas ref={canvasRef} width={1500} height={500} className="w-full h-auto border border-gray-300 shadow-md" />
      
      <ControlPanel
        patternType={patternType}
        setPatternType={setPatternType}
        colors={colors}
        setColors={setColors}
        variable={variable}
        setVariable={setVariable}
        randomness={randomness}
        setRandomness={setRandomness}
        distortion={distortion}
        setDistortion={setDistortion}
      />

      <button onClick={downloadImage} className="w-full max-w-md py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Download Image
      </button>
    </div>
  );
}
