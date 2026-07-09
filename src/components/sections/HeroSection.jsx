import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-slate-950 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl font-bold mb-6">Welcome to Codeferd Digital</h1>
        <p className="text-xl mb-8">
          Building secure digital platforms for governments, security organizations, and institutions.
        </p>
        <button className="bg-accent text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition duration-300">
          Get Started
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
