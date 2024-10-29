import React from 'react';

const PlayButtonIcon: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2017_328"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <path
          d="M8.00016 14.6667C11.6822 14.6667 14.6668 11.682 14.6668 8.00004C14.6668 4.31804 11.6822 1.33337 8.00016 1.33337C4.31816 1.33337 1.3335 4.31804 1.3335 8.00004C1.3335 11.682 4.31816 14.6667 8.00016 14.6667Z"
          fill="#555555"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M6.66699 8.00001V5.69067L8.66699 6.84534L10.667 8.00001L8.66699 9.15467L6.66699 10.3093V8.00001Z"
          fill="#555555"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_2017_328)">
        <path d="M0 0H16V16H0V0Z" fill="#7283E8" />
      </g>
    </svg>
  );
};

export default PlayButtonIcon;
