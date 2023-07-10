import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ApiResult, Employee, Industry, Integration, Job, Pagination, Query } from "@/config/types";

const descriptionTags = ["Integrations"] as readonly TagDescription<"Integrations">[] & string[];

export const integrationSlice = createApi({
  reducerPath: "integrations",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPaymentIntegrations: builder.query<ApiResult<Integration[]>, any>({
      query: () => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Integrations}`,
      }),
    }),
  }),
});
export const { useGetPaymentIntegrationsQuery } = integrationSlice;
