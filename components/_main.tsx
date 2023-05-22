import Header from "./header";

const Main = ({ Component, pageProps }: any) => {
    return (
        <>
            <Header/>
            <Component {...pageProps} />
        </>
    )
}

export default Main;