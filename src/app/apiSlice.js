import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//function to create proper tags for each data point
function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
      { type: tagType, id: 'LIST' },
      ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
    ]
    : [{ type: tagType, id: 'LIST' }];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl:''}),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => 'https://api.hatchways.io/assessment/students',
      transformResponse: (responseData) => responseData.students?.sort(
        (a, b) => a.id.localeCompare(b.id),
      ),
      providesTags: (result) => providesList(result.ids, 'Student'),
    }),
    // * For Step5
    // addTag: builder.mutation({
    //   queryFn: (state, { studentId, tags = [] }) => {
    //     // ToDo find student from state with studentID, if tags exsists, add to student
    //   }
    // })
  }),
});

export const { useGetAllStudentsQuery, useAddTagMutation } = apiSlice;
