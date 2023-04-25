import cryptoJs from "crypto-js";

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
