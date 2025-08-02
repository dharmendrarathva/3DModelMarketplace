import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ORDERS_PER_PAGE = 6;

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  

  // Stats data
  const orderStats = [
    { value: orders.length, label: 'Total Orders', icon: <FiPackage className="text-blue-400" /> },
  
  ];

  // Scroll to top when page changes
useEffect(() => {
  document.documentElement.scrollTop = 0; // The fastest method
}, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='mb-10'>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <h1 className='text-4xl font-bold text-white mb-2'>Order History</h1>
              <p className='text-gray-400 max-w-2xl'>
                Review your purchases, track shipments, and manage returns
              </p>
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-lg">
              Any Issue?
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {orderStats.map((stat, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            
          </div>

          {!orders[0] ? (
            <NoData darkMode={true} />
          ) : (
            <>
              <div className="space-y-4">
                {currentOrders.map((order, index) => (
                  <div 
                    key={order._id+index+"order"} 
                    className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">ORDER ID {order?.orderId}</p> 
                           
                          </div>
                         
                        </div>  

                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          <img
                            src={order.product_details.image[0]} 
                            className='w-34 h-24 object-cover rounded-lg'
                            alt={order.product_details.name}
                          />  
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-lg mb-1 group-hover:text-blue-400 transition-colors">
                              {order.product_details.name}
                            </h3>
                            <div className="flex gap-4">
                              
              
                              
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                          Track Order
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                                Download Zip
                         </button>
                        <button className="px-4 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {orders.length > ORDERS_PER_PAGE && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full ${currentPage === 1 ? 'bg-gray-800 text-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                  >
                    <FiChevronLeft />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-full ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full ${currentPage === totalPages ? 'bg-gray-800 text-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;