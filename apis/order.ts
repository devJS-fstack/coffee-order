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

export interface IResponseOrder {
    id: number;
    nameReceiver: string;
    phoneReceiver: string;
    addressReceiver: string;
    instructionAddressReceiver: string;
    plannedReceivedDate: string;
    paymentMethod: string;
    shippingFee: number;
    voucherDiscount: number;
    totalPayment: number;
    status: string;
    created: string;
    voucherId: number;
}

export interface IResponseToppingOrder {
    id: number;
    quantity: number;
    totalPrice: number;
    orderId: number;
    productId: number;
    toppingId: number;
}
export interface IResponseProductOrder {
    id: number;
    quantity: number;
    totalPrice: number;
    orderId: number;
    productId: number;
    sizeId: number;
    toppings: IResponseToppingOrder[];
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
        newOrder: builder.query({
            query: () => ({
                url: `${basePath}/new`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: {
                    data: {
                        order: IResponseOrder;
                        productOrders: IResponseProductOrder[];
                    };
                    message: string;
                },
                meta,
                arg,
            ) {
                console.log(baseQueryReturnValue);
                return baseQueryReturnValue.data;
            },
        }),
    }),
});

export const { useAddOrderMutation, useNewOrderQuery } = orderApiSlice;
