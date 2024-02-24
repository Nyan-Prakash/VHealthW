// CartoonButton.js
import React from 'react';
import './CartoonButton.css'; // Importing our custom CSS

const CartoonButton = ({ children, onClick, color = 'orange' }) => {
  return (
    <button
      onClick={onClick}
      className="cartoon-button"
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
};

export default CartoonButton;
