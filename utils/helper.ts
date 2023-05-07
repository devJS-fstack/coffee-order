import cryptoJs from "crypto-js";
import dayjs from "dayjs";
import { uniq } from "lodash";

const unavailableHours = [0, 1, 2, 3, 4, 5, 6, 7, 22, 23];

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
    const currentHour = dayjs().hour();
    const pastAndInvalidHours = Array.from(Array(currentHour).keys()).concat(
        unavailableHours
    );

    if (dayjs().minute() >= 30) {
        pastAndInvalidHours.push(currentHour);
    }

    return uniq(pastAndInvalidHours);
};

export const getNextHour = () => {
    let time = dayjs();
    const minute = time.minute();
    if (minute >= 30) {
        time = time.set("hour", time.hour() + 1);
        time = time.set("minute", 0);
    } else {
        time = time.set("minute", 30);
    }
    const currentHour = time.hour();
    if (unavailableHours.includes(currentHour)) {
        return null;
    }

    return time;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
