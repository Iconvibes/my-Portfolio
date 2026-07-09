import React from 'react';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  return (
    <section className="bg-slate-900 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Our Process</h2>
        <p className="text-xl mb-8">
          We follow a structured approach to ensure the success of every project.
        </p>
        <ul className="list-disc list-inside mt-10 space-y-4">
          <li>Discovery Phase</li>
          <li>Design Phase</li>
          <li>Development Phase</li>
          <li>Testing and Deployment</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default ProcessSection;
