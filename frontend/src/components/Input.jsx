import React from "react";

function Input({ type, name, id, className, placeholder, value, onChange }) {
  return (
    <div className="relative flex flex-col">
      <input
        type={type}
        name={name}
        id={id}
        className={`${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
