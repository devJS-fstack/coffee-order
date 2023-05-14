import { apiSlice } from "./index";

const basePath = "vouchers";

export type IVoucher = {
    id: number;
    code: string;
    type: string;
    nameVoucher: string;
    description: string;
    percentDiscount: number;
    priceDiscount: number;
    minPayment: number;
    maxDiscount: number;
    dateExpired: string;
    dateStart: string;
    limitUse: number;
    status: string;
};

export const voucherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        vouchers: builder.query({
            query: () => ({
                url: `${basePath}`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: { message: string; data?: IVoucher[] },
                meta,
                arg
            ) {
                return baseQueryReturnValue?.data;
            },
        }),
    }),
});

export const { useVouchersQuery } = voucherApiSlice;
