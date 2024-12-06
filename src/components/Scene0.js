import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FallingStars from "./FallingStars"; // If you want to reuse your falling stars component

const Scene0 = ({ setCurrentScene }) => {
  const [showStartButton, setShowStartButton] = useState(false);
  const [currentText, setCurrentText] = useState("Welcome to Luna's Story");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartButton(true);
    }, 3000); // Show button after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle the start button click and transition to next scene
  const goToNextScene = (e) => {
    e.preventDefault(); // Prevent scroll on click
    setCurrentScene(1); // Transition to Scene 1
    window.scrollTo({
      top: window.innerHeight, // Scroll down to next scene manually
      behavior: "smooth", // Smooth scroll
    });
  };

  return (
    <div className="scene scene0">
      <FallingStars isActive={true} />
      
      <motion.div
        className="background"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 2 }}
      >
        <div className="content">
          <h1>{currentText}</h1>
          {showStartButton && (
            <motion.button
              className="start-btn"
              onClick={goToNextScene} // Using goToNextScene here
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              Start Story
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Scene0;
