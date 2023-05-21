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


function MyApp({ Component, pageProps }: AppProps) {
  // const currentUser = useSelector(selectCurrentUser);
  // console.log("Current: ", currentUser);
  useEffect(() => {
    if (typeof window !== "undefined") {
      store.subscribe(() => {
          const { auth } = store.getState();
          const user = get(auth, "user");
          const accessToken = get(auth, "token") || "";
  
          if (user && accessToken) {
              localStorage.setItem(
                  "currentUser",
                  encodeAes(JSON.stringify(user), variables.cryptoAesKey)
              );
              localStorage.setItem(
                  "accessToken",
                  encodeAes(accessToken, variables.cryptoAesKey)
              );
          }
      });
  }
  }, [])
  return (
      <Provider store={store}>
        <Header></Header>
        <h1 style={{ display: "none" }}>Dev Nguyen Vercel Fullstack Blog</h1>
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp

