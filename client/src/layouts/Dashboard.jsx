
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector(state => state.user);

  console.log("user dashboard", user);

  return (
    <section className='bg-neutral-900'>
      {/* Header can go here if needed */}

      <div className='container mx-auto p-3'>
        {/* Main content area */}
        <div className='bg-neutral-900 min-h-[75vh] px-4 py-6 rounded-lg shadow-sm'>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
