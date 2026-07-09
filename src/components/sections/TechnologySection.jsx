import React from 'react';
import { motion } from 'framer-motion';

const TechnologySection = () => {
  return (
    <section className="bg-slate-800 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Our Technologies</h2>
        <p className="text-xl mb-8">
          We leverage cutting-edge technologies to build secure and scalable digital platforms.
        </p>
        <div className="flex justify-center gap-10 mt-10">
          <img src="/tech-icon1.png" alt="Tech Icon 1" className="h-16" />
          <img src="/tech-icon2.png" alt="Tech Icon 2" className="h-16" />
          <img src="/tech-icon3.png" alt="Tech Icon 3" className="h-16" />
        </div>
      </motion.div>
    </section>
  );
};

export default TechnologySection;
