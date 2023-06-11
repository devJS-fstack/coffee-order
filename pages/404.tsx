import { Button } from "antd";
import NotFoundIcon from "../assets/NotFoundIcon";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import BackV2 from "../assets/BackV2";
import { useRouter } from "next/router";
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="16" height="16" viewBox="0 0 17 17" fill="none" {...props}>
            <path
                d="M2.5 6.65l6-4.667 6 4.667v7.333a1.334 1.334 0 01-1.333 1.333H3.833A1.334 1.334 0 012.5 13.983V6.65z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.5 15.316V8.65h4v6.666"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const NotFound = () => {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center flex-col h-screen">
            <NotFoundIcon />
            <div className="py-8">
                <div className="text-center">
                    <span className="tw-sm_heading_h5">{"Page not found"}</span>
                </div>
                <div className="tw-text-center tw-mt-2">
                    <span className="tw-sm_body_b1_reg tw-text-[#6B7280]">
                        {"Sorry, the page you requested could not be found."}
                    </span>
                </div>
            </div>
            <div className="flex flex-row">
                <Button
                    onClick={() => {
                        router.push("/");
                    }}
                    icon={
                        <BackV2
                            className="text-white mr-2"
                            width={16}
                            height={16}
                        />
                    }
                    className="btn-back rounded-xl flex justify-between items-center mr-4"
                >
                    {"Back to Previous page"}
                </Button>
                <Button
                    onClick={() => {
                        router.push("/");
                    }}
                    className="ant-btn-white h-[40px] rounded-xl flex items-center"
                    style={{ backgroundColor: "#F2F3F4" }}
                    icon={
                        <HomeIcon
                            className="mr-2"
                            style={{ color: "var(--gray-800)" }}
                        />
                    }
                >
                    <span className="tw-text-gray800">{"Home"}</span>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
