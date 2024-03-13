import React, { useId } from "react";

//React.forwardRef ex 1
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`${className} rounded-md w-80 p-2 m-2 text-black font-normal`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
// React.forwardRef ex 2
// export default React.forwardRef(Input)
