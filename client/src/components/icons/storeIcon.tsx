import React from "react";

const StoreIcon = ({ className = "", ...props }) => (
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
      d="M1 5H21V9L20.301 9.42C19.757 9.74638 19.1346 9.91878 18.5002 9.91878C17.8659 9.91878 17.2435 9.74638 16.6995 9.42L16 9L15.301 9.42C14.757 9.74638 14.1346 9.91878 13.5002 9.91878C12.8659 9.91878 12.2435 9.74638 11.6995 9.42L11 9L10.301 9.42C9.75704 9.74638 9.13461 9.91878 8.50025 9.91878C7.86589 9.91878 7.24346 9.74638 6.6995 9.42L6 9L5.3005 9.42C4.7566 9.74628 4.13426 9.91863 3.5 9.91863C2.86574 9.91863 2.2434 9.74628 1.6995 9.42L1 9V5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 10.2445V21H19V10M3 4.911V1H19V5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 15H13.5V21H8.5V15Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StoreIcon; 