import React from "react";

export const Input = ({ className, onChange, value, type, placeholder }) => {
  return (
    <>
      <input
        className={className}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};
