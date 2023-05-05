import axios, { AxiosRequestConfig } from "axios";

export const getListAddress = async (value: string) => {
    try {
        const config: AxiosRequestConfig = {
            headers: {
                "TCH-APP-VERSION": "1",
                "TCH-DEVICE-ID": "1",
            },
            url: `https://api.thecoffeehouse.com/api/v5/map/autocomplete?key=${value}&lat=10.8043552&long=106.6996213`,
        };
        const data = await axios(config);
        return data?.data?.addresses;
    } catch (error) {
        console.log("Error while get location address");
    }
};
