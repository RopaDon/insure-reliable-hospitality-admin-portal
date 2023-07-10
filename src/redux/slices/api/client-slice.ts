import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ActionResult, ApiResult, Client, OptionSets, Pagination, Query } from "@/config/types";

const descriptionTags = ["Clients"] as readonly TagDescription<"Clients">[] & string[];

export const clientSlice = createApi({
  reducerPath: "clients",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getClients: builder.query<ApiResult<Pagination<Client>>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Clients}?${toQueryString(params)}`,
      }),
    }),
    getClient: builder.query<ApiResult<Client>, { id: string | number }>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Clients}/${params.id}`,
      }),
    }),
    getClientStatuses: builder.query<ApiResult<OptionSets[]>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Clients}/status`,
      }),
    }),
    createClient: builder.mutation<ApiResult<ActionResult>, any>({
      query: (body) => ({
        body,
        method: ApiMethods.POST,
        url: `/${BaseEndpoints.Clients}`,
      }),
    }),
    exportClients: builder.mutation<any, any>({
      query: () => ({
        responseType: "blob",
        method: ApiMethods.POST,
        url: `/${BaseEndpoints.Clients}/export`,
      }),
    }),

    updateStatus: builder.mutation<ApiResult<ActionResult>, { statusId: any; clientId: any }>({
      query: (body) => ({
        body,
        method: ApiMethods.PUT,
        url: `/${BaseEndpoints.Clients}/${body.clientId}/change-status`,
      }),
    }),

    deleteClient: builder.mutation<ApiResult<ActionResult>, { id: string | number }>({
      query: (params) => ({
        method: ApiMethods.DELETE,
        url: `/${BaseEndpoints.Clients}/${params.id}`,
      }),
    }),
  }),
});
export const {
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateStatusMutation,
  useExportClientsMutation,
  useGetClientStatusesQuery,
} = clientSlice;
