// Meteor.js
import React from "react";
import { motion } from 'framer-motion';  // Import motion from framer-motion

const Meteor = () => {
  const xPosition = Math.random() * 100;
  const delay = Math.random() * 5; // Randomize fall speed

  return (
    <motion.div
      className="meteor"
      style={{ left: `${xPosition}%` }}
      animate={{ top: "100vh" }}
      transition={{ repeat: Infinity, duration: 2 + delay, ease: "linear" }}
    />
  );
};

export default Meteor;
