import { RcFile } from "antd/es/upload";
import cryptoJs from "crypto-js";
import dayjs from "dayjs";
import { uniq } from "lodash";
import moment from "moment";
import { toast } from "react-toastify";

export const unavailableHours = [0, 1, 2, 3, 4, 5, 6, 7, 22, 23];

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

export const diffThanCurrentDate = (date: string) =>
    date ? moment(date).diff(moment(), "days") : 0;

export const validatePassword = (rule: any, value: string, callback: any) => {
    if (value?.length > 0) {
        if (value.length < 8) {
            return Promise.reject(new Error("At least 8 characters"));
        }

        if (value.length > 15) {
            return Promise.reject(new Error("Max 15 characters"));
        }

        if (!/(?=.*?[A-Z])/.test(value)) {
            return Promise.reject(new Error("At least 1 upper-case character"));
        }

        if (!/(?=.*?[a-z])/.test(value)) {
            return Promise.reject(new Error("At least 1 lower-case character"));
        }

        if (!/(?=.*?[0-9])/.test(value)) {
            return Promise.reject(new Error("At least 1 number"));
        }

        if (!/(?=.*?[#?!@$%^&*-])/.test(value)) {
            return Promise.reject(new Error("At least 1 special character"));
        }
    }
    return Promise.resolve();
};

export const getBase64 = (callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
};

export const checkFileCondition = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
        toast.error("Image must smaller than 1MB!");
    }
    return isLt2M;
};
