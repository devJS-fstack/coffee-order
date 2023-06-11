import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/main.css";
import "../styles/product.css";
import "../styles/responsive.css";
import Header from "../components/header";
import { Provider, useSelector } from "react-redux";
import { store } from "../app/store";
import { useEffect } from "react";
import { get } from "lodash";
import { encodeAes } from "../utils/helper";
import { variables } from "../utils/variable";
import { selectCurrentUser } from "../auth/authSlice";
import Main from "../components/_main";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            store.subscribe(() => {
                const { auth } = store.getState();
                const user = get(auth, "user");
                const accessToken = get(auth, "token") || "";
                const refreshToken = get(auth, "refreshToken") || "";

                if (user && accessToken) {
                    localStorage.setItem(
                        "currentUser",
                        encodeAes(JSON.stringify(user), variables.cryptoAesKey)
                    );
                    localStorage.setItem(
                        "accessToken",
                        encodeAes(accessToken, variables.cryptoAesKey)
                    );
                    localStorage.setItem(
                        "refreshToken",
                        encodeAes(refreshToken, variables.cryptoAesKey)
                    );
                }
            });
        }
    }, []);
    return (
        <Provider store={store}>
            <Main Component={Component} pageProps={pageProps} />
        </Provider>
    );
}

export default MyApp;
