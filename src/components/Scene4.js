import React, { useState, useEffect, useRef } from "react";
import GlowSlider from "./GlowSlider";
import { motion } from "framer-motion";
import FallingStars from "./FallingStars";
const Scene4 = () => {
  const [brightness, setBrightness] = useState(50);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isSceneVisible, setIsSceneVisible] = useState(false); // To track if scene is visible
  const [stars, setStars] = useState([]);
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
  const [isLunaSmiling, setIsLunaSmiling] = useState(false); // Track Luna's smile state
  const [isLunaBlinking, setIsLunaBlinking] = useState(false); // Track Luna's blinking state
  const [isSunWinking, setIsSunWinking] = useState(false); // Track Sun's wink state
  const sceneRef = useRef(null); // Reference to Scene 4 div

  const textMessages = [
    "Luna's glow was becoming brighter with every moment...",
    "She learned to shine, spreading light across the dark sky.",
    "As she glowed, her planet started to shine with her, lighting up the cosmos.",
    "Luna knew that her brightness could bring warmth and hope to her world.",
    "With every flicker, Luna's light grew stronger, and the stars began to dance around her.",
    "The entire galaxy could feel her glow, as Luna lit up the universe with her radiant light."
  ];
  useEffect(() => {
    // Generate falling stars when scene is visible
    if (isSceneVisible) {
      const interval = setInterval(() => {
        setStars((prevStars) => [
          ...prevStars,
          {
            id: Date.now(),
            left: Math.random() * 100 + "vw",
            duration: Math.random() * 3 + 2 + "s",
          },
        ]);
      }, 1000); // Generate stars every second

      return () => clearInterval(interval);
    }
  }, [isSceneVisible]);
  // Cycle through the text messages only when the scene is visible
  useEffect(() => {
    let timer;
    if (isSceneVisible) {
      // Set interval to change text every 6 seconds
      timer = setInterval(() => {
        if (currentTextIndex < textMessages.length - 1) {
          setCurrentTextIndex((prevIndex) => prevIndex + 1);
        } else {
          // Reset the text when we reach the last message to restart the cycle
          setCurrentTextIndex(0);
        }
      }, 6000); // Change text every 6 seconds
    } else {
      // Cleanup the timer if the scene is not visible
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup timer when component unmounts
  }, [currentTextIndex, isSceneVisible]);

  // Observer to check if Scene4 is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSceneVisible(entry.isIntersecting); // Update visibility status
      },
      { threshold: 0.5 } // Trigger when 50% of the scene is visible
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => {
      if (sceneRef.current) observer.unobserve(sceneRef.current); // Cleanup observer on unmount
    };
  }, []);

  return (
    <div
      id="scene4"
      className="scene scene4"
      ref={sceneRef}
      style={{
        backgroundColor: `rgba(255, 223, 186, ${brightness / 100})`,
      }}
    >
            <FallingStars isActive={isSceneVisible} />
      <div className="cosmic-glow"></div>
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
           filter: `brightness(${brightness}%)`
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
        Luna
      
      <GlowSlider onChange={setBrightness} />
      
      {/* Display the text messages only when the scene is visible */}
      {isSceneVisible && (
        <div className="text-box">
          <p>{textMessages[currentTextIndex]}</p>
        </div>
      )}
      
    </div>
  );
};

export default Scene4;
