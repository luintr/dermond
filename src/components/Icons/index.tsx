const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="#080808"
        d="M8 0a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm0 7c2.67 0 8 1.33 8 4v3H0v-3c0-2.67 5.33-4 8-4zm0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V13c0-.64-3.13-2.1-6.1-2.1z"
      ></path>
    </svg>
  );
};

const CartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        fill="#080808"
        d="M9 0a4 4 0 014 4h2.035a2 2 0 011.999 1.929l.428 12A2 2 0 0115.464 20H2.536a2 2 0 01-1.998-2.071l.428-12A2 2 0 012.965 4H5a4 4 0 014-4zM5 6H2.965l-.43 12h12.929l-.43-12H13v1a1 1 0 01-1.993.117L11 7V6H7v1a1 1 0 01-1.993.117L5 7V6zm4-4a2 2 0 00-1.995 1.85L7 4h4a2 2 0 00-2-2z"
      ></path>
    </svg>
  );
};

const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="24"
      fill="none"
      viewBox="0 0 28 24"
    >
      <ellipse
        cx="12"
        cy="12"
        fill="#080808"
        rx="12"
        ry="12"
        transform="rotate(90 12 12)"
      ></ellipse>
      <ellipse
        cx="16"
        cy="12"
        fill="#F0F1EC"
        rx="12"
        ry="12"
        transform="rotate(90 16 12)"
      ></ellipse>
    </svg>
  );
};

const ArrowIcon = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="14"
      fill={`${fill ? fill : 'none'}`}
      viewBox="0 0 20 14"
    >
      <path
        stroke={`${fill ? fill : '#080808'}`}
        strokeWidth="1.556"
        d="M13.333 13.666c0-.707.611-1.762 1.23-2.648.794-1.142 1.745-2.14 2.834-2.9.816-.571 1.806-1.119 2.603-1.119m0 0c-.797 0-1.788-.547-2.603-1.118-1.09-.762-2.04-1.759-2.834-2.9-.619-.886-1.23-1.944-1.23-2.648M20 6.999H0"
      ></path>
    </svg>
  );
};

const SingleArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="60"
      fill="none"
      viewBox="0 0 33 60"
    >
      <path
        stroke="#F0F1EC"
        strokeWidth="5"
        d="M30.345 0c0 3.18-2.78 7.929-5.595 11.914-3.619 5.143-7.943 9.63-12.9 13.055C8.132 27.536 3.626 30 0 30c3.626 0 8.136 2.464 11.85 5.031 4.957 3.429 9.281 7.916 12.9 13.05 2.814 3.99 5.595 8.748 5.595 11.919"
      ></path>
    </svg>
  );
};

const Subtract = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="24"
      fill="none"
      viewBox="0 0 14 24"
    >
      <path
        fill="#F0F1EC"
        fillRule="evenodd"
        d="M0 12c0 6.627 5.373 12 12 12 .681 0 1.35-.057 2-.166C8.325 22.882 4 17.946 4 12S8.325 1.118 14 .166C13.35.056 12.681 0 12 0 5.373 0 0 5.373 0 12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export { UserIcon, CartIcon, Logo, ArrowIcon, SingleArrowIcon, Subtract };
