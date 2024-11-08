import React from "react";

interface DotsIconProps {
  width?: number;
  height?: number;
  fillColor?: string;
}

const DotsIcon: React.FC<DotsIconProps> = ({
  width = 8,
  height = 28,
  fillColor = "#BEC7FD",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill={fillColor} />
      <circle cx="4" cy="14" r="4" fill={fillColor} />
      <circle cx="4" cy="24" r="4" fill={fillColor} />
    </svg>
  );
};

export default DotsIcon;
