import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FallingStars from "./FallingStars";

const Scene2 = ({ setCurrentScene }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showNextSceneButton, setShowNextSceneButton] = useState(false);
  const [isSceneVisible, setIsSceneVisible] = useState(false); // Track scene visibility
  const sceneRef = useRef(null); // Reference to Scene2 div
  const [isSunWinking, setIsSunWinking] = useState(false); // Track Sun's wink state
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
  const textMessages = [
    "Sol encouraged Luna to find her light...",
    "In the vast cosmos, she needed to shine brighter to stand out.",
    "Her glow wasn’t just for herself, but for the world to see.",
    "She had to be bold, to embrace the light within.",
    "Would Luna succeed? The universe was watching.",
  ];

  useEffect(() => {
    let timer;
    if (isSceneVisible) {
      timer = setInterval(() => {
        if (currentTextIndex < textMessages.length - 1) {
          setCurrentTextIndex((prevIndex) => prevIndex + 1);
        } else {
          setShowNextSceneButton(true); // Show "Next Scene" button after all texts
        }
      }, 9000);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [currentTextIndex, isSceneVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSceneVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => {
      if (sceneRef.current) observer.unobserve(sceneRef.current);
    };
  }, []);

  // Navigate to next scene and handle smooth scroll
  const goToNextScene = (e) => {
    e.preventDefault();

    setCurrentScene(3); // Move to Scene 3

    const nextScene = document.getElementById("scene3");
    if (nextScene) {
      nextScene.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="scene2" className="scene scene2" ref={sceneRef}>
      {/* Your animation and content for Scene 2 */}
        {/* Sun Animation */}
        <motion.div
        className="sun"
        animate={{
          scale: [1, 1.2, 1], // Pulsing effect
          backgroundColor: ["#FFD700", "#FF6347", "#FFD700"], // Color change
          opacity: isSunWinking ? [1, 0.6, 1] : 1, // Winking effect
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        style={{ borderRadius: "50%", cursor: "pointer" }}
      >
        {/* Sun's personality can be shown here */}
      </motion.div>

      {/* Luna Reacting to the Sun */}
      <motion.div
        className="luna"
        animate={{
          scale: isSunWinking ? 1.1 : 1, // Luna's reaction to Sun winking
          x: isSunWinking ? 20 : 0, // Slight movement
          y: isSunWinking ? -10 : 0,
        }}
        transition={{ duration: 1 }}
        style={{
          backgroundColor: "#fffacd",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >  <div className="luna-eyes" style={{ position: "absolute", top: "30%", left: "25%", width: "50%", display: "flex", justifyContent: "space-between" }}>
      {/* Luna's eyes follow the Sun */}
      <motion.div
            className="eye"
            animate={{
              x: sunPosition.x / 20,
              y: sunPosition.y / 20,
            }}
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: "#000",
            }}
          />
          <motion.div
            className="eye"
            animate={{
              x: sunPosition.x / 20,
              y: sunPosition.y / 20,
            }}
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: "#000",
            }}
          />
        </div>

        {/* Luna's Smile */}
        <motion.div
  className="smile"
  transition={{ duration: 0.5 }}
  style={{
    position: "absolute",
    bottom: "30%", // Adjust vertical position for a nice centered smile
    left: "25%", // Center horizontally
    width: "50%", // Widen the smile
    height: "10px", // Increase thickness for better visibility
    backgroundColor: "transparent", // Transparent base
    borderTop:"0px",
    borderBottom: "15px solid black", // Smile color
    borderRadius: "100%", // Smooth downward curve
    transform: "rotate(0deg)", // Keep the curve symmetrical
    transformOrigin: "center", // Ensures the curve is from the center
  }}
/>
      </motion.div>
      <FallingStars isActive={isSceneVisible} />
      {/* Cosmic Glow Effect */}
      <div className="cosmic-glow"></div>
      <AnimatePresence>
        {isSceneVisible && (
          <motion.div
            key={currentTextIndex}
            className="text-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <p>{textMessages[currentTextIndex]}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show the "Next Scene" button */}
      {showNextSceneButton && (
        <motion.button
          onClick={goToNextScene}
          className="next-scene-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Next Scene
        </motion.button>
      )}
    </div>
  );
};

export default Scene2;
