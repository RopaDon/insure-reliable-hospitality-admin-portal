import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ActionResult, ApiResult, Waitlist, OptionSets, Pagination, Query } from "@/config/types";

const descriptionTags = ["Waitlist"] as readonly TagDescription<"Waitlist">[] & string[];

export const waitlistSlice = createApi({
  reducerPath: "waitlist",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getWaitlist: builder.query<ApiResult<Pagination<Waitlist>>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Waitlist}?${toQueryString(params)}`,
      }),
    }),
    getWaitlistUser: builder.query<ApiResult<Waitlist>, { id: string | number }>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Waitlist}/${params.id}`,
      }),
    }),

    createWaitlistUser: builder.mutation<ApiResult<ActionResult>, any>({
      query: (body) => ({
        body,
        method: ApiMethods.POST,
        url: `/${BaseEndpoints.Waitlist}`,
      }),
    }),
    exportWaitlist: builder.mutation<any, any>({
      query: () => ({
        responseType: "blob",
        method: ApiMethods.POST,
        url: `/${BaseEndpoints.Waitlist}/export`,
      }),
    }),
    deleteWaitlistUser: builder.mutation<ApiResult<ActionResult>, { id: string | number }>({
      query: (params) => ({
        method: ApiMethods.DELETE,
        url: `/${BaseEndpoints.Waitlist}/${params.id}`,
      }),
    }),
  }),
});
export const { useGetWaitlistQuery, useCreateWaitlistUserMutation, useDeleteWaitlistUserMutation } = waitlistSlice;
