import { apiSlice } from "./apiSlice.js";
import { ORDER_URL } from "../constants.js";

export const apiSlice_order = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // create_order        api/order/
        createOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDER_URL}/`,
                method: "POST",
                body: data,
            }),
        }),

        // get_ordersAll      api/order/allorders
        getOrdersAll: builder.query({
            query: () => ({
                url: `${ORDER_URL}/allorders`,
            }),
            providesTags: ["Order"],
            keepUnusedDataFor: 5,
        }),

        // get_product_withID      api/product/:id
        // getProductDetails: builder.query({
        //     query: (id) => ({
        //         url: `${ORDER_URL}/${id}`,
        //     }),
        //     providesTags: ["Product"],
        //     keepUnusedDataFor: 5,
        //     }),

    }),
});

// names by use + Defined Mutation
export const {
    useCreateOrderMutation,
    useGetOrdersAllQuery,
} = apiSlice_order;