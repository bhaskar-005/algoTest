import React from 'react';

const PlayButton: React.FC = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2017_933"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="28"
      >
        <path
          d="M14 26.5C20.9037 26.5 26.5 20.9037 26.5 14C26.5 7.09625 20.9037 1.5 14 1.5C7.09625 1.5 1.5 7.09625 1.5 14C1.5 20.9037 7.09625 26.5 14 26.5Z"
          fill="#555555"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 14V9.67004L15.25 11.835L19 14L15.25 16.165L11.5 18.33V14Z"
          fill="#555555"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_2017_933)">
        <path d="M-1 -1H29V29H-1V-1Z" fill="#7283E8" />
      </g>
    </svg>
  );
};

export default PlayButton;