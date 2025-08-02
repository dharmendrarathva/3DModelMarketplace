// import React from 'react'
// import { Link } from 'react-router-dom'

// const Cancel = () => {
//   return (
//     <div className='m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
//         <p className='text-red-800 font-bold text-lg text-center'>Order Cancelled</p>
//         <Link to="/" className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1">Go To Home</Link>
//     </div>
//   )
// }

// export default Cancel



      


      import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cancel = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  const xMarkVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="fixed top-20 left-0 right-0  flex items-center justify-center  p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          variants={itemVariants}
        >
          <svg 
            className="w-16 h-16 text-red-500"
            viewBox="0 0 52 52" 
          >
            <motion.path
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              d="M16 16 L36 36 M36 16 L16 36"
              variants={xMarkVariants}
            />
          </svg>
        </motion.div>

        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-2"
          variants={itemVariants}
        >
          Order Cancelled
        </motion.h2>

        <motion.p 
          className="text-gray-600 mb-6"
          variants={itemVariants}
        >
          Your order was cancelled.
          <br />
           No payment has been processed.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-red-200"
          >
            Return to Home
          </Link>
        </motion.div>

        <motion.div 
          className="mt-6 pt-6 border-t border-gray-200"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="text-red-500 hover:underline">Contact support</Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cancel;