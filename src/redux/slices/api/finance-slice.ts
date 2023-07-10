import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ApiResult, Currency, Employee, Industry, Job, Pagination, Query } from "@/config/types";

const descriptionTags = ["Finance"] as readonly TagDescription<"Finance">[] & string[];

export const financeSlice = createApi({
  reducerPath: "finances",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSupportedCurrencies: builder.query<ApiResult<Currency[]>, any>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Finance}`,
      }),
    }),
  }),
});
export const { useGetSupportedCurrenciesQuery } = financeSlice;
