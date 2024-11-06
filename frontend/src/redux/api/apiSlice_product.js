import { apiSlice } from "./apiSlice.js";
import { PRODUCT_URL, UPLOAD_URL } from "../constants.js";

export const apiSlice_user = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    
        // upload_image        api/product/upload_image
        uploadImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/`,
                method: "POST",
                body: data,
            }),
        }),

        // create_product        api/product/
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/`,
                method: "POST",
                body: data,
            }),
        }),

        // get_productsAll      api/product/allproducts
        getProductsAll: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/allproducts`,
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,
        }),

        // delete_product_withID    api/product/:id
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "DELETE",
            }),
        }),

        // get_product_withID      api/product/:id
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,
            }),

    }),
});

// names by use + Defined Mutation
export const {
    useUploadImageMutation,
    useCreateProductMutation,
    useGetProductsAllQuery,
    useDeleteProductMutation,
    useGetProductDetailsQuery,
} = apiSlice_user;