import React from "react";

function Loader() {
  return (
      <div className="loader">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="130"
        fill="none"
        viewBox="0 0 100 100"
        style={{ top: 263 }}
        >
        <circle
            cx="50"
            cy="50"
            r="24"
            stroke="#0277BD"
            strokeDasharray="37.69911184307752 37.69911184307752"
            strokeLinecap="round"
            strokeWidth="5"
        >
            <animateTransform
            attributeName="transform"
            dur="1.0989010989010988s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;360 50 50"
            ></animateTransform>
        </circle>
        <circle
            cx="50"
            cy="50"
            r="18"
            stroke="#97a6ba"
            strokeDasharray="28.274333882308138 28.274333882308138"
            strokeDashoffset="28.274"
            strokeLinecap="round"
            strokeWidth="5"
        >
            <animateTransform
            attributeName="transform"
            dur="1.0989010989010988s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;-360 50 50"
            ></animateTransform>
        </circle>
        </svg>
      </div>
  );
}

export default Loader;
