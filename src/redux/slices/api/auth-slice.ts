import { baseQueryWithReauth } from "./base-slice";
import { ApiResult, Token } from "@/config/types";
import AuthenticateAdminDTO from "@/config/modules/types/auth";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";

const descriptionTags = ["Auth"] as readonly TagDescription<"Auth">[] & string[];

export const authenticationSlice = createApi({
  reducerPath: "authentication",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    authenticateAdmin: builder.mutation<ApiResult<Token>, AuthenticateAdminDTO>({
      query: (payload) => ({
        body: payload,
        method: ApiMethods.POST,
        url: `/${BaseEndpoints.Auth}/admin`,
      }),
      invalidatesTags: descriptionTags,
    }),
  }),
});
export const { useAuthenticateAdminMutation } = authenticationSlice;
