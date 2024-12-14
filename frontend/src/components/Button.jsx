import React from "react";

function Button({ label, className, type }) {
  return (
    <button type={type} className={`${className}`}>
      {label}
    </button>
  );
}

export default Button;
