import React from 'react';
import { motion } from 'framer-motion';

const FeaturedCaseStudySection = () => {
  return (
    <section className="bg-slate-800 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Featured Case Study</h2>
        <p className="text-xl mb-8">
          Learn how we helped a government agency streamline their operations.
        </p>
        <div className="mt-10">
          <img src="/case-study-image.png" alt="Case Study Image" className="w-full rounded-lg" />
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedCaseStudySection;
