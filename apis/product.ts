import { apiSlice } from "./index";

const basePath = "products";

export type IProduct = {
    id: number;
    nameProduct: string;
    favIcon: string;
    description: string;
    categoryId: number;
    price: number;
    enable?: boolean;
    sizes?: ISizeProduct[];
    toppingIds: number[];
};

export type ITopping = {
    id: number;
    nameTopping: string;
    price: number;
    enable: boolean;
    deleted: boolean;
};

export type ISizeProduct = {
    id: number;
    size: string;
    price: number;
    name?: string;
};

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: ({
                categoryId,
                limit = 12,
                pageNumber = 1,
                enable,
            }: {
                categoryId?: number;
                limit?: number;
                pageNumber?: number;
                enable?: boolean;
            }) => {
                const offset = (pageNumber - 1) * limit;

                return {
                    url: `${basePath}?categoryId=${categoryId}&limit=${limit}&offset=${offset}&enable=${enable}`,
                    method: "GET",
                };
            },
            transformResponse(
                baseQueryReturnValue: {
                    message: string;
                    data: IProduct[];
                    total: number;
                },
                meta,
                arg,
            ) {
                return {
                    products: baseQueryReturnValue.data,
                    total: baseQueryReturnValue.total,
                };
            },
        }),
        product: builder.query({
            query: (id) => {
                return {
                    url: `${basePath}/${id}`,
                    method: "GET",
                };
            },
            transformResponse(
                baseQueryReturnValue: {
                    data: {
                        product: IProduct;
                        toppings: ITopping[];
                        sizes: ISizeProduct[];
                    };
                },
                meta,
                arg,
            ) {
                return {
                    ...baseQueryReturnValue.data,
                };
            },
        }),
        createProduct: builder.mutation({
            query: (payload: FormData) => {
                return {
                    url: `${basePath}`,
                    method: "POST",
                    body: payload,
                };
            },
        }),
        updateProduct: builder.mutation({
            query: ({ payload, id }: { payload: FormData; id: number }) => {
                return {
                    url: `${basePath}/${id}`,
                    method: "PUT",
                    body: payload,
                };
            },
        }),
        deleteProduct: builder.mutation({
            query: ({ productId }: { productId: number }) => ({
                url: `${basePath}/${productId}`,
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
        updateStatusProduct: builder.mutation({
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
    }),
});

export const {
    useProductsQuery,
    useProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUpdateStatusProductMutation,
} = productApiSlice;
