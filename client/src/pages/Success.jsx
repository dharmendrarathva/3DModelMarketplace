// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'

// const Success = () => {
//   const location = useLocation()
    
//     console.log("location",)  
//   return (
//     <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
//         <p className='text-green-800 font-bold text-lg text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment" } Successfully</p>
//         <Link to="/" className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1">Go To Home</Link>
//     </div>
//   )
// }

// export default Success


// import React, { useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Success = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate('/dashboard/my-orders');
//     }, 10000); // 3 seconds

//     return () => clearTimeout(timer); // Cleanup on unmount
//   }, [navigate]);

//   return (
//     <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
//       <p className='text-green-800 font-bold text-lg text-center'>
//         {Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successfully
//       </p>
//       <Link
//         to="/dashboard/my-orders"
//         className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
//       >
//         Go To Orders
//       </Link>
//     </div>
//   );
// };

// export default Success;



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Success = () => {
  const location = useLocation();

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

  const checkmarkVariants = {
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
      className="fixed top-20 left-0 right-0 flex items-center justify-center p-4"
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
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          variants={itemVariants}
        >
          <svg 
            className="w-16 h-16 text-green-500"
            viewBox="0 0 52 52" 
          >
            <motion.path
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              variants={checkmarkVariants}
            />
          </svg>
        </motion.div>

        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-2"
          variants={itemVariants}
        >
          {Boolean(location?.state?.text) ? location?.state?.text : "Payment Successful!"}
        </motion.h2>

        <motion.p 
          className="text-gray-600 mb-6"
          variants={itemVariants}
        >
          Thank you for your order. Your transaction has been completed successfully.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/dashboard/my-orders"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Get Your Models
          </Link>
        </motion.div>

        <motion.div 
          className="mt-6 pt-6 border-t border-gray-200"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="text-green-600 hover:underline">Contact support</Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Success;