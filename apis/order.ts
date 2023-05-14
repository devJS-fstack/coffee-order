import { apiSlice } from "./index";

const basePath = "orders";

interface IToppingDetail {
    toppingId: number;
    quantity: number;
}

interface IOrderDetail {
    productId: number;
    quantity: number;
    sizeId: number;
    toppings: IToppingDetail[];
}

export interface IPayloadCreateOrder {
    nameReceiver: string;
    phoneReceiver: string;
    addressReceiver: string;
    instructionAddressReceiver: string;
    plannedReceivedDate?: string;
    paymentMethod: string;
    shippingFee: number;
    voucherId?: number;
    orderDetail: IOrderDetail;
}

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: (payload: IPayloadCreateOrder) => ({
                url: `${basePath}`,
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const { useAddOrderMutation } = orderApiSlice;
