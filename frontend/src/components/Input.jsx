import React from "react";

function Input({
  type,
  name,
  id,
  className,
  placeholder,
  value,
  onChange,
  error,
}) {
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
      <p className="text-red-600 text-sm h-3">{error ? error : ""}</p>
    </div>
  );
}

export default Input;
