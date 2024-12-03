import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FallingStars from "./FallingStars";

const Scene1 = ({ setCurrentScene }) => {
  const [liked, setLiked] = useState(false);
  const [moonClickSound, setMoonClickSound] = useState(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showNextSceneButton, setShowNextSceneButton] = useState(false);
  const [isSceneVisible, setIsSceneVisible] = useState(false); // Track scene visibility
  const [lunaPosition, setLunaPosition] = useState({ x: 0, y: 0 }); // Track Luna's position
  const [isLunaClicked, setIsLunaClicked] = useState(false); // Track if Luna is clicked
  const [hasClickedOnce, setHasClickedOnce] = useState(false); // Flag to track if Luna has been clicked before
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
  const sceneRef = useRef(null); // Reference to the scene div

  const textMessages = [
    "Luna felt dim and unnoticed...",
    "In the vastness of the universe, her glow was small, but she yearned for recognition.",
    "Suddenly, something stirred in the cosmos... a spark of hope, a flicker of light.",
    "Would the stars notice her? Could she shine brighter than before?",
  ];

  // Load the audio when the component mounts
  useEffect(() => {
    const audio = new Audio("/rising-to-the-moon-197229.mp3");
    setMoonClickSound(audio);
  }, []);

  // Handle moon click interaction
  const handleMoonClick = () => {
    if (moonClickSound) {
      if (moonClickSound.paused) {
        moonClickSound.play();
      } else {
        moonClickSound.pause();
        moonClickSound.currentTime = 0;
      }
    }
    setLiked(!liked); // Toggle the liked state

    // Show "Place me where you want" text only if it's the first time clicking Luna
    if (!hasClickedOnce) {
      setIsLunaClicked(true); // Show the text
      setHasClickedOnce(true); // Set the flag to true so the text doesn't appear again
      setTimeout(() => {
        setIsLunaClicked(false); // Hide the text after 3 seconds
      }, 3000);
    }
  };

  // Start cycling text messages only when scene is visible
  useEffect(() => {
    if (isSceneVisible) {
      const timer = setInterval(() => {
        if (currentTextIndex < textMessages.length - 1) {
          setCurrentTextIndex((prevIndex) => prevIndex + 1);
        } else {
          setShowNextSceneButton(true); // Show "Next Scene" button after all texts
        }
      }, 9000); // Change text every 9 seconds

      return () => clearInterval(timer); // Cleanup timer on unmount
    }
  }, [currentTextIndex, isSceneVisible]);

  // Observe visibility of the scene
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
      if (sceneRef.current) observer.unobserve(sceneRef.current);
    };
  }, []);

  // Navigate to next scene
  const goToNextScene = (e) => {
    e.preventDefault(); // Prevent scroll on click
    setCurrentScene(2); // Transition to Scene 2
    window.scrollTo({
      top: window.innerHeight, // Scroll down to next scene manually
      behavior: "smooth", // Smooth scroll
    });
  };

  // Handle Drag End
  const handleDragEnd = () => {
    // Reset Luna's position to its original state
    setLunaPosition({ x: 0, y: 0 });
  };

  return (
    <div className="scene scene1" ref={sceneRef}>
      {/* Falling Stars */}
      <FallingStars isActive={isSceneVisible} />

      {/* Planet Rotation */}
      <motion.div
        className="planet"
        animate={{ rotate: 360 }} // Rotate the planet 360 degrees
        transition={{
          repeat: Infinity, // Repeat infinitely
          duration: 10, // Duration for one full rotation (10 seconds)
          ease: "linear", // Use linear easing for smooth continuous rotation
        }}
      >
        Planet
      </motion.div>

      {/* Luna (Moon) */}
      <motion.div
        className="luna"
        drag
        dragConstraints={{
          top: -window.innerHeight / 3,
          bottom: window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 3,
        }}
        dragElastic={0.2} // Add slight elasticity for better interaction
        onDragEnd={handleDragEnd}
        animate={lunaPosition}
        transition={{ duration: 0.5 }}
        onClick={handleMoonClick}
        style={{
          cursor: "pointer",
          backgroundColor: liked ? "#90ee90" : "#fffacd",
          boxShadow: liked ? "0 0 20px 10px rgba(255, 255, 255, 0.7)" : "none",
        }}
      ><div className="luna-eyes" style={{ position: "absolute", top: "30%", left: "25%", width: "50%", display: "flex", justifyContent: "space-between" }}>
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
    borderRadius: "10%", // Smooth downward curve
    transform: "rotate(0deg)", // Keep the curve symmetrical
    transformOrigin: "center", // Ensures the curve is from the center
  }}
/>   <div
    style={{
      marginTop: "60px", // Move the text downwards
      
    }}
  >
    Luna
  </div>
      </motion.div>

      {/* Cosmic Glow */}
      <div className="cosmic-glow"></div>

      {/* Text Box */}
      <div className="text-box">
        <p>{textMessages[currentTextIndex]}</p>
      </div>

      {/* Conditional text showing "Place me where you want" when Luna is clicked for the first time */}
      {isLunaClicked && (
        <motion.div
          className="place-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
            I'm like a sticker, but cuter. Stick me where you like!
        </motion.div>
      )}

      {/* Show "Next Scene" Button after all text messages are displayed */}
      {showNextSceneButton && (
        <motion.button
          className="next-scene-btn"
          onClick={goToNextScene}
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

export default Scene1;
