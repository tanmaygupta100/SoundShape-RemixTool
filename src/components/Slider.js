import { useState } from "react";

const Slider = ({min, max, step, init}) => {

    const [value, setValue] = useState(init);

    const handleChange = (e) => {
        const newValue = Math.min(Math.max(e.target.value, min), max);
        setValue(newValue);
    }

    const range = max - min; // Total range
    const width = '6.49rem'; // Explicitly setting width here
    const spacing = range > 0 ? parseFloat(width) / range : 0; // Use the 8rem width in the calculation
    const lines = Array.from({ length: range + 1 }, (_, i) => min + i); // Generate array of lines


    console.log(`Range: ${range}, Spacing: ${spacing}, Total Height: ${(range - 1) * spacing}rem`);

    return (
        
        <div className='flex justify-center'>
            
            <div
                className="absolute -top-16 flex flex-col"
                style={{ gap: `${spacing}rem` }}
            >
                {lines.map((line) => (
                    <div key={line} className="w-20 h-1 bg-cusBrdr opacity-50"></div>
                ))}
            </div>

            <div className="slider-container -rotate-90">
                {/* Visible Slider: */}
                <div className="slider-track">
                    <div
                        className="slider-thumb"
                        style={{ left: `${((value - min) / (max - min)) * 100}%` }}
                    />
                </div>
                
                {/* Hidden Input: */}
                <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="slider-input"
                />
            </div>
        </div>
    );
};

export default Slider;