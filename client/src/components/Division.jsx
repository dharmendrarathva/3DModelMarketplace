import React from 'react';

const Division = () => {
  const dividerStyle = {
    width: '100%',
    height: '1px',              // Thin line
    border: 'none',
    backgroundColor: '#888',    // Medium gray, softer than #ccc
    margin: '2rem 0',
    opacity: 0.6,               // Slight transparency for a softer look
  };

  return <hr style={dividerStyle} />;
};

export default Division;
