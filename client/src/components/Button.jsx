import React from "react";

export const Button = ({ 
    // write attributes here
    children, 
    type = 'button',
    className = '',
    value = '',
    ...props
}) => {
  return <button className={`${className}`} {...props}>
        {children}
    </button>
  
};

export default Button;
