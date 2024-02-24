import React from 'react';
import './CoolInput.css'; // Importing our custom CSS

const CoolInput = ({ type = 'text', placeholder = '', onChange, value}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="cool-input"
    />
  );
};

export default CoolInput;
