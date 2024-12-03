import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Star from "./Star";
import FallingStars from "./FallingStars";

const Scene3 = ({ setCurrentScene }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showNextSceneButton, setShowNextSceneButton] = useState(false);
  const [isSceneVisible, setIsSceneVisible] = useState(false); // Track scene visibility
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
  const [isLunaSmiling, setIsLunaSmiling] = useState(false); // Track Luna's smile state
  const [isLunaBlinking, setIsLunaBlinking] = useState(false); // Track Luna's blinking state
  const [isSunWinking, setIsSunWinking] = useState(false); // Track Sun's wink state
  const sceneRef = useRef(null);
  const textMessages = [
    "As Luna floated in the cosmic expanse, she saw a comet streak by...",
    "The comet twirled around her, inviting her to join in its cosmic dance.",
    "With every move, Luna’s glow grew brighter, learning to twinkle like the stars.",
    "The playful stars around her twinkled and danced, each sharing their own rhythm.",
    "Luna embraced the dance, her glow shimmering across the cosmos."
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
      }, 9000); // Change text every 9 seconds
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [currentTextIndex, isSceneVisible]);

  // Observe visibility of Scene3
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSceneVisible(entry.isIntersecting); // Update visibility status
      },
      { threshold: 0.5 } // Trigger when 50% of Scene3 is visible
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
    e.preventDefault(); // Prevent default button action (scroll)

    // Update current scene state to move to Scene 4
    setCurrentScene(4);

    // Scroll to the next scene manually
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 3, // Scroll to Scene 4 (assuming you have 4 scenes)
        behavior: "smooth", // Smooth scroll
      });
    }, 200); // Allow time for the scene change to be triggered before scrolling
  };

  return (
    <div className="scene scene3" ref={sceneRef}>
        <FallingStars isActive={isSceneVisible} />

      {/* Comet Animation */}
      <motion.div
        className="comet"
        initial={{ x: "-20%", y: "30%" }}
        animate={{ x: "120%", y: "-10%" }}
        transition={{ duration: 5, repeat: Infinity }}
      />
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


      {/* Playful Stars */}
      <div className="playful-stars">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="playful-star"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
          >
            🌟
          </motion.div>
        ))}
      </div>

      {/* Cosmic Glow Effect */}
      <div className="cosmic-glow"></div>

      {/* Using AnimatePresence for text box transitions */}
      <AnimatePresence>
        {isSceneVisible && (
          <motion.div
            key={currentTextIndex} // Trigger re-render on text change
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

      {/* Show "Next Scene" Button after all text messages are displayed */}
      {showNextSceneButton && (
        <motion.button
          className="next-scene-btn"
          onClick={goToNextScene} // Prevent scroll and go to next scene
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

export default Scene3;
