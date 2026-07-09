import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  return (
    <section className="bg-slate-800 text-white py-24 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Trusted by Leading Organizations</h2>
        <p className="text-xl mb-8">
          We partner with governments, security organizations, and institutions to deliver secure digital solutions.
        </p>
        <div className="flex justify-center gap-10 mt-12">
          <img src="/logo1.png" alt="Logo 1" className="h-16" />
          <img src="/logo2.png" alt="Logo 2" className="h-16" />
          <img src="/logo3.png" alt="Logo 3" className="h-16" />
        </div>
      </motion.div>
    </section>
  );
};

export default TrustSection;
