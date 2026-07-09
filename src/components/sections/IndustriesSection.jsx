import React from 'react';
import { motion } from 'framer-motion';

const IndustriesSection = () => {
  return (
    <section className="bg-slate-900 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Our Industries</h2>
        <p className="text-xl mb-8">
          We serve a diverse range of industries to meet their unique digital needs.
        </p>
        <ul className="list-disc list-inside mt-10 space-y-4">
          <li>Government Agencies</li>
          <li>Security Organizations</li>
          <li>NGOs</li>
          <li>Healthcare</li>
          <li>Education</li>
          <li>Faith-Based Organizations</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default IndustriesSection;
