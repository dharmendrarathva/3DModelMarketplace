import React from 'react';
import { IoMdClose } from "react-icons/io";import '../componentcss/ViewImage.css';

const ViewImage = ({ url, close }) => {
  return (
    <div className="view-image-overlay">
      <div className="view-image-container">
        <button onClick={close} className="close-button">
          <IoMdClose size={38} />
        </button>
        <div className="image-wrapper">
          <img
            src={url}
            alt="full screen"
            className="view-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
