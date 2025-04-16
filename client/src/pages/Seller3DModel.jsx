import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const Seller3DModel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm"
      >
        <motion.h1 
          className="text-2xl font-bold text-gray-800 mb-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
           Sell Own 3D Model
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore and showcase your 3D models with ease and elegance.
        </motion.p>
      </motion.div>
      
      {/* Upload Icon at Bottom with more gap */}
      <div className="p-5 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition mt-8">
        <Upload className="w-5 h-5 text-gray-700" />
      </div>
      <motion.p 
        className="text-white text-sm mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        🚧This feature is currently unavailable. We are working on it!
      </motion.p>
    </div>
  );
};

export default Seller3DModel;
