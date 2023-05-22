import type { AppProps } from "next/app";
import Header from "./header";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { ROLES } from "../utils/variable";
import NavigationAdmin from "./Navigation";
import { useEffect, useState } from "react";
import { delay } from "../utils/helper";
import CustomSpin from "./Spin";


const Main = ({ Component, pageProps }: any) => {
    const currentUser = useSelector(selectCurrentUser);
    const isAdmin = currentUser?.Role?.role === ROLES.SUPER_ADMIN;
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     delay(1000).then(() => {
    //         setIsLoading(false);
    //     })
    // }, [])
    return (
        <div>
            {
                isAdmin ?? <Header/>
            }
            <Component {...pageProps} />
        </div>
    )
}

export default Main;