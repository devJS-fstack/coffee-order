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

export interface IPayloadUpdateProductOrder {
    productOrderId: number;
    quantity: number;
    sizeId: number;
    toppingOrders: IToppingDetail[];
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
    productQuantity: number;
    totalPrice: number;
    toppingId: number;
    productOrderId: number;
}
export interface IResponseProductOrder {
    id: number;
    quantity: number;
    totalPrice: number;
    orderId: number;
    productId: number;
    sizeId: number;
    nameProduct: string;
    size: string;
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
                return baseQueryReturnValue.data;
            },
        }),
        updateProductOrder: builder.mutation({
            query: (payload: IPayloadUpdateProductOrder) => ({
                url: `${basePath}`,
                method: "PUT",
                body: payload,
            }),
        }),
        deleteProductOrder: builder.mutation({
            query: (productOrderId: number) => ({
                url: `${basePath}/product-orders/${productOrderId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useAddOrderMutation,
    useNewOrderQuery,
    useUpdateProductOrderMutation,
    useDeleteProductOrderMutation,
} = orderApiSlice;
