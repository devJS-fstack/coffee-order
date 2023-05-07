import { apiSlice } from "./index";

const basePath = "categories";

export type ICategory = {
    id: number;
    nameCategory: string;
    favIcon: string;
    description: string;
};

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        categories: builder.query({
            query: () => ({
                url: `${basePath}`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: { message: string; data?: ICategory[] },
                meta,
                arg
            ) {
                return baseQueryReturnValue?.data;
            },
        }),
    }),
});

export const { useCategoriesQuery } = categoryApiSlice;
