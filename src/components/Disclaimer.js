import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const Disclaimer = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-0 right-0 z-50 mx-4 md:mx-auto max-w-4xl bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-lg"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">Medical Disclaimer</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                This website is for informational purposes only and is not a substitute for professional medical advice. 
                Always seek the advice of your physician or other qualified health provider with any questions you may 
                have regarding Guillain-Barré Syndrome or any other medical condition.
              </p>
              <p className="mt-2">
                If you think you may have a medical emergency, immediately call your doctor or emergency services.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 ml-4 text-red-500 hover:text-red-700"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Disclaimer;
