import React from 'react';
import { IoClose } from "react-icons/io5";
import "../componentcss/CofirmBox.css";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="confirm-box-overlay">
      <div className="confirm-box-container">
        <div className="confirm-box-header">
          <h1 className="confirm-box-title">Permanent Delete</h1>
          <button onClick={close} className="confirm-box-close-btn">
            <IoClose size={25} />
          </button>
        </div>
        <p className="confirm-box-message">Are you sure permanent delete?</p>
        <div className="confirm-box-buttons">
          <button onClick={cancel} className="confirm-box-btn Boxcancel-btn">Cancel</button>
          <button onClick={confirm} className="confirm-box-btn Boxconfirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;