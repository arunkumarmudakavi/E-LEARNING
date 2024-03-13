import React from "react";

export const Button = ({ 
    // write attributes here
    children, 
    type = 'button',
    className = '',
    value = '',
    ...props
}) => {
  return <button className={`${className} bg-white text-black font-bold font-mono rounded-md w-auto p-2 m-2` } {...props}>
        {children}
    </button>
  
};

export default Button;
