import React from "react";
import { motion } from "framer-motion";
import './ending.css';
const EndingPage = ({ handleRestart }) => {
  return (
    <div className="ending-page">
      <motion.div
        className="ending-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1>The Little Moon Who Wanted to Shine</h1>
        
        <section className="story-summary">
          <h2>The Story So Far...</h2>
          <p>
            Luna, the little moon, felt small and dim compared to the other moons
            in the sky. She wondered if she would ever shine bright like them. After
            meeting Sol, the sun, and finding a comet who taught her how to sparkle
            and dance, Luna discovered that she has her own special way of shining.
            She realized that her light, though different, was unique and beautiful
            in its own way. Luna now lights up her planet and spreads joy to all who
            gaze at her in the night sky.
          </p>
        </section>
        
        <section className="story-moral">
          <h2>Moral of the Story</h2>
          <p>
            The moral of the story is that everyone has their unique light to shine.
            No matter how small or different we may seem, our individuality makes the
            world a brighter place. Embrace your uniqueness, for it is what makes you
            special and worthy of shining brightly in the world.
          </p>
        </section>
        
        <motion.button
          className="restart-btn"
          onClick={handleRestart} // Correctly using the handleRestart prop here
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          Restart Story
        </motion.button>
      </motion.div>
    </div>
    
  );
};

export default EndingPage;
