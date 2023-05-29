import { apiSlice } from "./index";

const basePath = "categories";

export type ICategory = {
    id: number;
    nameCategory: string;
    favIcon: string;
    description: string;
    enable?: boolean;
};

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        categories: builder.query({
            query: ({ enable = false }: { enable?: boolean }) => ({
                url: `${basePath}?enable=${enable}`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: { message: string; data?: ICategory[] },
                meta,
                arg,
            ) {
                return baseQueryReturnValue?.data;
            },
        }),
        createCategory: builder.mutation({
            query: (payload: ICategory) => ({
                url: `${basePath}`,
                method: "POST",
                body: payload,
            }),
        }),
        updateCategory: builder.mutation({
            query: (payload: { formData: FormData; id: number }) => ({
                url: `${basePath}/${payload.id}`,
                method: "PUT",
                body: payload.formData,
            }),
        }),
        updateStatusCategory: builder.mutation({
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
        deleteCategory: builder.mutation({
            query: ({ categoryId }: { categoryId: number }) => ({
                url: `${basePath}/${categoryId}`,
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
    useCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useUpdateStatusCategoryMutation,
    useLazyCategoriesQuery,
    useDeleteCategoryMutation,
} = categoryApiSlice;
