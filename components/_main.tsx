import { ToastContainer } from "react-toastify";
import Header from "./header";
import { injectStyle } from "react-toastify/dist/inject-style";

const Main = ({ Component, pageProps }: any) => {
    if (typeof window !== "undefined") {
        injectStyle();
    }
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
};

export default Main;
