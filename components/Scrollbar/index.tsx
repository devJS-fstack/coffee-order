import { useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars";

const ScrollbarsV1 = ({ isOpen, height, children,  }: { isOpen: boolean, height: number, children: JSX.Element }) => {
    const scrollRef = useRef(null);
    const { scrollToTop } = scrollRef.current || {} as any;
    console.log(isOpen);
    if (scrollToTop && !isOpen) {
        scrollToTop();
    }

    return (
        <Scrollbars ref={scrollRef}
            renderThumbHorizontal={() => <div></div>}
            renderThumbVertical={() => <div></div>}
            autoHide style={{ height }}>
            {children}
        </Scrollbars>
    )
}

export default ScrollbarsV1