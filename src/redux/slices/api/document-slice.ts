import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { ApiResult, Document, Pagination, Query } from "@/config/types";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";

const descriptionTags = ["Document"] as readonly TagDescription<"Document">[] & string[];

export const documentSlice = createApi({
  reducerPath: "documents",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDocuments: builder.query<ApiResult<Pagination<Document>>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Document}?${toQueryString(params)}`,
      }),
    }),
  }),
});
export const { useGetDocumentsQuery } = documentSlice;
