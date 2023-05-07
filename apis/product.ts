import { apiSlice } from "./index";

const basePath = "products";

export type IProduct = {
    id: number;
    nameProduct: string;
    favIcon: string;
    description: string;
    categoryId: number;
    price: number;
};

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: ({
                categoryId,
                limit = 12,
                pageNumber = 1,
            }: {
                categoryId: number;
                limit?: number;
                pageNumber?: number;
            }) => {
                const offset = (pageNumber - 1) * limit;

                return {
                    url: `${basePath}?categoryId=${categoryId}&limit=${limit}&offset=${offset}`,
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
                arg
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
                baseQueryReturnValue: { data: IProduct },
                meta,
                arg
            ) {
                return baseQueryReturnValue.data;
            },
        }),
    }),
});

export const { useProductsQuery, useProductQuery } = productApiSlice;
