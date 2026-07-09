import React from 'react';
import { motion } from 'framer-motion';

const FAQSection = () => {
  return (
    <section className="bg-slate-800 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <p className="text-xl mb-8">
          We are here to answer any questions you may have about our services.
        </p>
        <div className="mt-10 space-y-4">
          <details className="bg-slate-700 p-6 rounded-lg">
            <summary className="font-bold">What is your pricing model?</summary>
            <p>We offer flexible pricing plans to suit various needs.</p>
          </details>
          <details className="bg-slate-700 p-6 rounded-lg mt-4">
            <summary className="font-bold">How long does a project take?</summary>
            <p>The duration varies based on the complexity of the project.</p>
          </details>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;
