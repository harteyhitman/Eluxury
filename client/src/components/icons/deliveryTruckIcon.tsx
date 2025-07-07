import React from "react";

const DeliveryTruckIcon = ({ className = "", ...props }) => (
  <svg
    className={className}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 6.5H14.5V15.5H2V6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 10.5H18.5L20 13V15.5H14.5V10.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="5.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default DeliveryTruckIcon; 