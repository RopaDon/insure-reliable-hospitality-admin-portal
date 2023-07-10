import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ActionResult, ApiResult, Waitlist, OptionSets, Pagination, Query } from "@/config/types";

const descriptionTags = ["Staff"] as readonly TagDescription<"Staff">[] & string[];

export const staffSlice = createApi({
  reducerPath: "staff",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getStaffMembers: builder.query<ApiResult<Pagination<any>>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Staff}?${toQueryString(params)}`,
      }),
    }),
  }),
});
export const { useGetStaffMembersQuery } = staffSlice;
