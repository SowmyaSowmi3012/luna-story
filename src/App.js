import React, { useState, useEffect } from "react";
import Scene1 from "./components/Scene1";
import Scene2 from "./components/Scene2";
import Scene3 from "./components/Scene3";
import Scene4 from "./components/Scene4";

const App = () => {
  const [currentScene, setCurrentScene] = useState(1); // Track the current scene
  const [scrollTimeout, setScrollTimeout] = useState(null); // To hold the debounce timeout ID

  // Debounced Scroll Handler
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Determine the current scene based on scroll position
    const scene = Math.ceil((scrollPosition + 1) / viewportHeight);

    // If the scene has changed, set the new scene
    if (scene !== currentScene) {
      // Clear the previous timeout to avoid overlapping timers
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a new timeout to update the scene after a small delay (e.g., 200ms)
      setScrollTimeout(
        setTimeout(() => {
          setCurrentScene(scene); // Update the scene
        }, 200) // 200ms debounce time
      );
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup listener and timeout on unmount
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentScene, scrollTimeout]); // Ensure the effect re-runs when `currentScene` or `scrollTimeout` changes

  return (
    <div className="App">
      <div className="scene-container">
        {/* Render all scenes */}
        <div className={`scene ${currentScene === 1 ? "active" : ""}`}>
          <Scene1 setCurrentScene={setCurrentScene} />
        </div>
        <div className={`scene ${currentScene === 2 ? "active" : ""}`}>
          <Scene2 setCurrentScene={setCurrentScene} />
        </div>
        <div className={`scene ${currentScene === 3 ? "active" : ""}`}>
          <Scene3 setCurrentScene={setCurrentScene} />
        </div>
        <div className={`scene ${currentScene === 4 ? "active" : ""}`}>
          <Scene4 setCurrentScene={setCurrentScene} />
        </div>
      </div>
    </div>
  );
};

export default App;
