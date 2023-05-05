import cryptoJs from "crypto-js";
import dayjs from "dayjs";
import moment from "moment";

export const encodeAes = (data: string, secretKey: string) => {
    return cryptoJs.AES.encrypt(data, secretKey).toString();
};

export const decodeAes = (data: any, secretKey: string) => {
    try {
        const bytes = cryptoJs.AES.decrypt(data, secretKey);
        return bytes.toString(cryptoJs.enc.Utf8);
    } catch (error) {
        return {};
    }
};

export const isJson = (data: any) => {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
};

export const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};

export const getPastHours = () => {
    const currentHour = moment().hours();
    return Array.from(Array(currentHour + 1).keys());
};

export const getNextHour = () => {
    const time = dayjs();
    const minute = time.minute();
    if (minute >= 30) {
        return time.startOf("hour").add(1, "hour");
    }
    return time.startOf("hour").add(30, "minutes");
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
