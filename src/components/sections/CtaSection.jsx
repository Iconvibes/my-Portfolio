import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="bg-slate-900 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8">
          Let's discuss how we can help your organization achieve its digital goals.
        </p>
        <button className="bg-accent text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition duration-300">
          Contact Us
        </button>
      </motion.div>
    </section>
  );
};

export default CTASection;
