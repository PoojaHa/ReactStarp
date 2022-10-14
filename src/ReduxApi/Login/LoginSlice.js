import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LoginApi = createApi({
reducerPath: 'LoginApi',
   baseQuery: fetchBaseQuery({
    baseUrl: 'http://13.232.20.246:2222/',
}),

    tagTypes: ['users'],
    endpoints: (builder) => ({
    createLoginPost: builder.mutation({
        query: (newPost) => {
         console.log("Create Post: ", newPost)
         return {
          url: `/admin/login`,
          method: 'POST',
          body: newPost,
          headers: {
           'Content-type': 'application/json; charset=UTF-8',
          }
        }
        }
       }),
       invalidatesTags: ['users']
    })
})
export const { useCreateLoginPostMutation} = LoginApi;