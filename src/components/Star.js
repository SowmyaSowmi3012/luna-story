import React from 'react';
import './Star.css';

const Star = ({ x, y }) => {
  return (
    <div
      className="star"
      style={{
        top: `${y}vh`,
        left: `${x}vw`,
        animationDelay: `${Math.random() * 5}s`, // Random delay for twinkling
      }}
    ></div>
  );
};

export default Star;
