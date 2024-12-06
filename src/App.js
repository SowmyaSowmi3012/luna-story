import React, { useState, useEffect, useRef } from "react";
import Scene0 from "./components/Scene0";
import Scene1 from "./components/Scene1";
import Scene2 from "./components/Scene2";
import Scene3 from "./components/Scene3";
import Scene4 from "./components/Scene4";
import EndingPage from "./components/Endingpage"; // Ensure the capitalization matches

const App = () => {
  const [currentScene, setCurrentScene] = useState(0); // Start with Scene0
  const scrollTimeoutRef = useRef(null); // Use useRef to persist the timeout ID
  const isScrolling = useRef(false); // Flag to prevent redundant scroll event handling

  // Debounced Scroll Handler
  const handleScroll = () => {
    if (isScrolling.current) return; // Prevent redundant scroll handling during a scroll

    isScrolling.current = true;
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Determine the current scene based on scroll position
    const scene = Math.ceil((scrollPosition + 1) / viewportHeight);

    // If the scene has changed, set the new scene
    if (scene !== currentScene && scene <= 5) {
      // Clear the previous timeout to avoid overlapping timers
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a new timeout to update the scene after a small delay (e.g., 200ms)
      scrollTimeoutRef.current = setTimeout(() => {
        setCurrentScene(scene); // Update the scene
        isScrolling.current = false; // Reset the scrolling flag
      }, 200); // 200ms debounce time
    } else {
      isScrolling.current = false; // Reset the scrolling flag if no update occurs
    }
  };

  // Define the handleRestart function
  const handleRestart = () => {
    setCurrentScene(0); // Reset to the first scene (Scene 0)
    window.scrollTo(0, 0); // Scroll back to the top of the page
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup listener and timeout on unmount
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array ensures that effect only runs once on mount

  return (
    <div className="App">
      <div className="scene-container">
        {/* Render all scenes */}
        <div className={`scene ${currentScene === 0 ? "active" : ""}`}>
          <Scene0 setCurrentScene={setCurrentScene} />
        </div>
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

        {/* Show EndingPage after Scene 4 */}
      
          <div className={`scene ${currentScene === 5 ? "active" : ""}`}>
            <EndingPage handleRestart={handleRestart} />
          </div>
      
      </div>
    </div>
  );
};

export default App;
