import React from 'react';

const patternOptions = [
  { value: 'mandelbrot', label: 'Mandelbrot Set' },
  { value: 'julia', label: 'Julia Set' },
  { value: 'sineWaves', label: 'Sine Waves' },
  { value: 'ripples', label: 'Ripples' },
  { value: 'spiral', label: 'Spiral' },
  { value: 'hyperbolic', label: 'Hyperbolic' },
  { value: 'polarRose', label: 'Polar Rose' },
  { value: 'checkerboard', label: 'Checkerboard' },
  { value: 'voronoi', label: 'Voronoi' },
  { value: 'perlinNoise', label: 'Perlin Noise' },
  { value: 'sierpinskiTriangle', label: 'Sierpinski Triangle' },
  { value: 'phyllotaxis', label: 'Phyllotaxis' },
];

interface ControlPanelProps {
  patternType: string;
  setPatternType: (type: string) => void;
  colors: string[];
  setColors: (colors: string[]) => void;
  variable: number;
  setVariable: (value: number) => void;
  randomness: number;
  setRandomness: (value: number) => void;
  distortion: number;
  setDistortion: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  patternType,
  setPatternType,
  colors,
  setColors,
  variable,
  setVariable,
  randomness,
  setRandomness,
  distortion,
  setDistortion,
}) => {
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="patternSelect" className="font-medium">Pattern:</label>
        <select
          id="patternSelect"
          value={patternType}
          onChange={(e) => setPatternType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-base"
        >
          {patternOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="variable" className="font-medium">Intensity: {variable.toFixed(2)}</label>
        <input
          id="variable"
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={variable}
          onChange={(e) => setVariable(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="randomness" className="font-medium">Randomness: {randomness.toFixed(2)}</label>
        <input
          id="randomness"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={randomness}
          onChange={(e) => setRandomness(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="distortion" className="font-medium">Distortion: {distortion.toFixed(2)}</label>
        <input
          id="distortion"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={distortion}
          onChange={(e) => setDistortion(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {colors.map((color, index) => (
        <div key={index} className="flex flex-col gap-2">
          <label htmlFor={`color${index + 1}`} className="font-medium">Color {index + 1}:</label>
          <div className="flex gap-2">
            <input
              id={`color${index + 1}`}
              type="color"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="w-1/4 h-10 p-0 border-0"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="w-3/4 p-2 border border-gray-300 rounded-md text-base"
            />
          </div>
        </div>
      ))}

      <button 
        onClick={() => setColors([...colors, '#ffffff'])} 
        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Add Color
      </button>
    </div>
  );
};

export default ControlPanel;