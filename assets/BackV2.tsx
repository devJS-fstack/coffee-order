import * as React from "react";

function BackV2(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0.876325 5.52863L6.09556 0.390625L7.05313 1.33329L2.98989 5.33329H14.8992C15.2737 5.33329 15.5765 5.63196 15.5765 5.99996C15.5765 6.36796 15.2737 6.66662 14.8992 6.66662H2.98989L7.05313 10.6666L6.09556 11.6093L0.876325 6.47129C0.611537 6.21063 0.611537 5.78929 0.876325 5.52863Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default BackV2;
