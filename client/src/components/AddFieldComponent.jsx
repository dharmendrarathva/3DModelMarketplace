import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import '../componentcss/AddFieldComponent.css';

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (value.trim().length < 3) {
      setError('Field name have must be at least 3 characters long.');
    } else {
      setError('');
      submit();
    }
  };

  const suggestions = [
    'Extra Information',
    'Texture Type',
    'Render Engine',
    'Model Format',
    'Rigged / Animated',
    'Compatible Software',
    'File Size'
  ];

  return (
    <section className="add-field">
      <div className="add-field__container">
        <div className="add-field__header">
          <h1 className="add-field__title">Add Field</h1>
          <button onClick={close} className="add-field__close-btn">
            <IoClose size={28} />
          </button>
        </div>

        <input
          className="add-field__input"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />
        {error && (
          <p className="add-field__error-message">
            {error}
          </p>
        )}

        <button onClick={handleSubmit} className="add-field__submit-btn">
          Add Field
        </button>

        <div className="add-field__suggestions">
          <p className="add-field__suggestions-title">Suggestions:</p>
          <ul className="add-field__suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="add-field__suggestion-item">{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AddFieldComponent;