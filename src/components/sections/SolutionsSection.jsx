import React from 'react';
import { motion } from 'framer-motion';

const SolutionsSection = () => {
  return (
    <section className="bg-slate-800 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Our Solutions</h2>
        <p className="text-xl mb-8">
          We provide tailored solutions to meet the specific needs of governments, security organizations, and institutions.
        </p>
        <ul className="list-disc list-inside mt-10 space-y-4">
          <li>Secure Web Applications</li>
          <li>Government Portals</li>
          <li>Business Automation</li>
          <li>Document Management Systems</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default SolutionsSection;
