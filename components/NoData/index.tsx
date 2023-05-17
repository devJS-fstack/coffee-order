import React from "react";

interface NoDataProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  className?: string;
}

const NoData = ({ title = "", subTitle = "", className = "" }: NoDataProps) => {
  return (
    <div className={`${className} p-6 rounded-xl`}>
        <div
        className="w-full flex justify-center items-center flex-col p-6"
        >
        <svg
            width={65}
            height={40}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2"
        >
            <g clipPath="url(#a)">
            <path
                d="M32.5 39.703c17.673 0 32-3.11 32-6.948 0-3.837-14.327-6.948-32-6.948-17.673 0-32 3.11-32 6.948 0 3.837 14.327 6.948 32 6.948Z"
                fill="#D8E1FE"
            />
            <path
                d="M55.5 13.665 45.354 2.25C44.867 1.47 44.156 1 43.407 1H21.593c-.749 0-1.46.47-1.947 1.248L9.5 13.666v9.17h46v-9.17Z"
                stroke="#7897FF"
            />
            <path
                d="M42.113 16.813c0-1.593.994-2.909 2.227-2.91H55.5v18.003c0 2.107-1.32 3.834-2.95 3.834h-40.1c-1.63 0-2.95-1.728-2.95-3.834V13.903h11.16c1.233 0 2.227 1.313 2.227 2.907v.021c0 1.593 1.005 2.88 2.237 2.88h14.752c1.232 0 2.237-1.298 2.237-2.891v-.007Z"
                fill="#EFF3FF"
                stroke="#7897FF"
            />
            </g>
            <defs>
            <clipPath id="a">
                <path fill="#fff" transform="translate(.5)" d="M0 0h64v40H0z" />
            </clipPath>
            </defs>
        </svg>
            <div className="text-center text-no-data">
                <div>{title}</div>
                <div>{subTitle}</div>
            </div>
        </div>
    </div>
  );
};

export default NoData;
