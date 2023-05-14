import { Spin, SpinProps } from "antd";

const CustomSpin = (props: React.HTMLProps<HTMLDivElement>) => (
    <div {...props} className={`flex justify-center items-center w-full h-screen ${props.className}`}>
        <Spin />
    </div>
)

export default CustomSpin;