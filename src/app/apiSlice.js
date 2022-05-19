import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { retry } from '@reduxjs/toolkit/dist/query';

const staggeredBaseQuery = retry(
  async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({ baseUrl: '' })(
      args,
      api,
      extraOptions,
    );

    // bail out of re-tries immediately if unauthorized,
    // because we know successive re-retries would be redundant
    if (result.error?.status === 401) {
      retry.fail(result.error);
    }

    return result;
  },
  {
    maxRetries: 5,
  },
);

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
  baseQuery: staggeredBaseQuery,
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
