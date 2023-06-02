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

export interface IPayloadPlaceOrder {
    nameReceiver: string;
    phoneReceiver: string;
    addressReceiver: string;
    instructionAddressReceiver: string;
    plannedReceivedDate?: string;
    paymentMethod: string;
    code: string;
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
    orderedDate: string;
    processedDate: string;
    shipDate: string;
    receivedDate: string;
}

export interface IResponseOrders extends IResponseOrder {
    productOrders: IResponseProductOrder[];
}
export interface IResponseToppingOrder {
    id: number;
    quantity: number;
    productQuantity: number;
    totalPrice: number;
    toppingId: number;
    productOrderId: number;
    status: string;
    Topping: {
        id: number;
        nameTopping: string;
        price: number;
        enabled: boolean;
    };
}

export interface ISize {
    id: string;
    price: number;
    productId: number;
    size: string;
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
    sizeDetail: ISize;
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
        orders: builder.query({
            query: () => ({
                url: `${basePath}`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: {
                    data: IResponseOrders[];
                    message: string;
                },
                meta,
                arg,
            ) {
                return baseQueryReturnValue.data;
            },
        }),
        ordersByAdmin: builder.query({
            query: () => ({
                url: `${basePath}/all`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: {
                    data: IResponseOrders[];
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
        deleteOrder: builder.mutation({
            query: (orderId: number) => ({
                url: `${basePath}/${orderId}`,
                method: "DELETE",
            }),
        }),
        placeOrder: builder.mutation({
            query: ({
                orderId,
                payload,
            }: {
                orderId: number;
                payload: IPayloadPlaceOrder;
            }) => ({
                url: `${basePath}/place/${orderId}`,
                method: "POST",
                body: payload,
            }),
        }),
        markStatus: builder.mutation({
            query: ({ orderId }: { orderId: number }) => ({
                url: `${basePath}/mark-status/${orderId}`,
                method: "PUT",
            }),
            transformErrorResponse: (error: any) => {
                const { data } = error || {};
                return data.message || "Sorry! Something went wrong";
            },
        }),
    }),
});

export const {
    useAddOrderMutation,
    useNewOrderQuery,
    useUpdateProductOrderMutation,
    useDeleteProductOrderMutation,
    useDeleteOrderMutation,
    usePlaceOrderMutation,
    useOrdersQuery,
    useLazyOrdersByAdminQuery,
    useOrdersByAdminQuery,
    useMarkStatusMutation,
} = orderApiSlice;
