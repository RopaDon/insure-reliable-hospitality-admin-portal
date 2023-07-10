import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ApiResult, Employee, Job, JobExperienceLevel, Pagination, Query } from "@/config/types";

const descriptionTags = ["Job"] as readonly TagDescription<"Job">[] & string[];

export const jobSlice = createApi({
  reducerPath: "jobs",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getJobs: builder.query<ApiResult<Pagination<Job>>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Job}?${toQueryString(params)}`,
      }),
    }),
    getJobExperience: builder.query<ApiResult<JobExperienceLevel[]>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Job}/experience-levels`,
      }),
    }),
  }),
});
export const { useGetJobsQuery, useGetJobExperienceQuery } = jobSlice;
