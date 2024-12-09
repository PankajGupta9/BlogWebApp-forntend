import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Blogs'], // Define 'Blogs' tag for cache invalidation
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: () => '/api/v1/blogs',
      providesTags: ['Blogs'], // Marks data for invalidation
    }),
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: '/api/v1/blogs/create',
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: ['Blogs'], // Invalidates 'Blogs' to refetch data
    }),
    updateBlog: builder.mutation({
      query: ({ id, blogData }) => ({
        url: `/api/v1/blogs/update/${id}`,
        method: 'PUT',
        body: blogData,
      }),
      invalidatesTags: ['Blogs'], // Invalidates 'Blogs' to refetch data
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/v1/blogs/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blogs'], // Invalidates 'Blogs' to refetch data
    }),
    getBlogById: builder.query({
      query: (id) => `/api/v1/blogs/${id}`,
      providesTags: ['Blogs'],
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
} = blogApi;

export default blogApi;
