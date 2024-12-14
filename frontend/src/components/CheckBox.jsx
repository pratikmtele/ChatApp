import React from "react";

function CheckBox({ name, onChange }) {
  return (
    <div className="flex my-2">
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          className="peer hidden"
          onChange={onChange}
        />
        {/* <!-- Custom Checkbox --> */}
        <div className="w-5 h-5 bg-gray-100 border border-gray-400 rounded peer-checked:bg-[#013eeb] peer-checked:border-[#013eeb] flex items-center justify-center">
          {/* <!-- Check Icon --> */}
          <i className="fa-solid fa-check w-4 h-4 text-center text-[#f3f4f6]"></i>
        </div>
        <span className="ml-2 text-[#19191b] text-md">Remember Me</span>
      </label>
    </div>
  );
}

export default CheckBox;
