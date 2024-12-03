import React, { useState } from "react";

const GlowSlider = ({ onChange }) => {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    const brightness = e.target.value;
    setValue(brightness);
    onChange(brightness);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="10"
        max="100"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default GlowSlider;
