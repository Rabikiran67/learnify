import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This function prepares the headers for each request
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: '', // The base URL is an empty string because of the vite proxy
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the Redux state
    const token = getState().auth.userInfo?.token;
    if (token) {
      // If the token exists, add it to the Authorization header
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth, // Use the new baseQuery with auth headers
  tagTypes: ['User', 'Course', 'Category', 'Enrollment', 'Lesson'],
  endpoints: (builder) => ({}),
});