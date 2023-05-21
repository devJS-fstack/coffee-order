import type { AppProps } from "next/app";
import Header from "./header";


const Main = ({ Component, pageProps }: AppProps) => {
    (
        <>
             <Header/>
            <Component {...pageProps} />
        </>
    )
}

export default Main;