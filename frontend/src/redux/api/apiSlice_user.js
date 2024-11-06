import { apiSlice } from "./apiSlice.js";
import { USER_URL } from "../constants.js";

export const apiSlice_user = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        // user_Login           api/user/login/
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        // user_Logout          api/user/logout/
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
            }),
        }),

        // create_user        api/user/
        createUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/`,
                method: "POST",
                body: data,
            }),
        }),

        // get_userProfile      api/user/profile/
        getUserProfile: builder.query({
            query: () => ({
                url: `${USER_URL}/profile`,
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5,
            }),

        // get_usersAll         api/user/allprofiles
        getUsersAll: builder.query({
            query: () => ({
                url: `${USER_URL}/allprofiles`,
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5,
        }),

        //delete_user_withID       api/user/:id
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            }),
        }),

        //get_user_withID       api/user/:id
        // getUserDetails: builder.query({
        //     query: (id) => ({
        //         url: `${USER_URL}/${id}`,
        //     }),
        //     keepUnusedDataFor: 5,
        // }),
    }),
});


// names by use + Defined Mutation
export const {
    useLoginMutation,
    useLogoutMutation,
    useCreateUserMutation,
    useGetUserProfileQuery,
    useGetUsersAllQuery,
    useDeleteUserMutation,
    // useGetUserDetailsQuery,
} = apiSlice_user;