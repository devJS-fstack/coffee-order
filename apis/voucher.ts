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
    imageUrl: string;
    enable: boolean;
    isLimited: boolean;
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
        discount: builder.query({
            query: ({
                totalPayment,
                code,
            }: {
                totalPayment: number;
                code: string;
            }) => ({
                url: `${basePath}/discount?totalPayment=${totalPayment}&code=${code}`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: { message: string; data?: number },
                meta,
                arg
            ) {
                return baseQueryReturnValue?.data;
            },
        }),
        allVoucher: builder.query({
            query: () => ({
                url: `${basePath}/all`,
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
        createVoucher: builder.mutation({
            query: (payload: FormData) => {
                return {
                    url: `${basePath}`,
                    method: "POST",
                    body: payload,
                };
            },
        }),
        updateVoucher: builder.mutation({
            query: ({ id, payload }: { payload: FormData; id: number }) => {
                return {
                    url: `${basePath}/${id}`,
                    method: "PUT",
                    body: payload,
                };
            },
        }),
        updateStatusVoucher: builder.mutation({
            query: ({ status, id }: { id: number; status: string }) => ({
                url: `${basePath}/${id}/status/${status}`,
                method: "PATCH",
            }),
            transformErrorResponse: (error: any) => {
                const { data } = error || {};
                return {
                    statusCode: data.statusCode || 400,
                    message: data.message || "Sorry! Something went wrong",
                };
            },
        }),
        deleteVoucher: builder.mutation({
            query: ({ voucherId }: { voucherId: number }) => ({
                url: `${basePath}/${voucherId}`,
                method: "DELETE",
            }),
            transformErrorResponse: (error: any) => {
                const { data } = error || {};
                return {
                    statusCode: data.statusCode || 400,
                    message: data.message || "Sorry! Something went wrong",
                };
            },
        }),
    }),
});

export const {
    useVouchersQuery,
    useDiscountQuery,
    useLazyDiscountQuery,
    useAllVoucherQuery,
    useCreateVoucherMutation,
    useUpdateVoucherMutation,
    useUpdateStatusVoucherMutation,
    useDeleteVoucherMutation,
} = voucherApiSlice;
