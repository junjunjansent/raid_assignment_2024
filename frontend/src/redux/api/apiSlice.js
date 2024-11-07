import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL, PORT, } from '../constants.js';

console.log('Import Meta Env:', import.meta.env); // Log all environment variables
console.log('API Base URL:', BASE_URL);
console.log('Port:', PORT); // Log the port

const baseQuery = fetchBaseQuery({ 
    baseUrl: BASE_URL,
    credentials: 'include', // As default is 'same-origin' (to prevent cross-site request forgery (CSRF) attacks and control over when cookies and credentials are included, especially where API not intended for access across different origins)
 });

const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "Order", "User"],
    endpoints: () => ({}),
});

export { apiSlice };