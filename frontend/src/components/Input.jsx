import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type,
      name,
      id,
      className,
      placeholder,
      value,
      onChange,
      error,
      min,
      max,
      step,
      onInput,
      disabled,
    },
    ref
  ) => {
    return (
      <div className="relative flex flex-col">
        <input
          type={type}
          name={name}
          id={id}
          ref={ref}
          className={`${className}`}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          onInput={onInput}
        />
        <p className="text-red-600 text-sm h-3">{error ? error : ""}</p>
      </div>
    );
  }
);

export default Input;
