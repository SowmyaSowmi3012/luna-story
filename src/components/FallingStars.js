import React, { useState, useEffect } from "react";
import "./FallingStars.css"; // The CSS for the falling stars

const FallingStars = ({ isActive }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setStars((prevStars) => [
          ...prevStars,
          {
            id: Date.now(),
            left: Math.random() * 100 + "vw", // Random horizontal position
            size: Math.random() * 4 + 2 + "px", // Random size
            duration: Math.random() * 3 + 2 + "s", // Random duration
            color: `rgba(255, ${Math.random() * 255}, ${Math.random() * 255}, 1)`, // Random pastel color
          },
        ]);
      }, 1000);

      return () => clearInterval(interval); // Clear interval on component unmount or inactive state
    }
  }, [isActive]);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="falling-star"
          style={{
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            backgroundColor: star.color,
          }}
        ></div>
      ))}
    </div>
  );
};

export default FallingStars;
