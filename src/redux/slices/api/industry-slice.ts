import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ApiResult, Employee, Industry, Job, Pagination, Query } from "@/config/types";

const descriptionTags = ["Industry"] as readonly TagDescription<"Industry">[] & string[];

export const industrySlice = createApi({
  reducerPath: "industries",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getIndustries: builder.query<ApiResult<Pagination<Industry>>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Industry}?${toQueryString(params)}`,
      }),
    }),
  }),
});
export const { useGetIndustriesQuery } = industrySlice;
