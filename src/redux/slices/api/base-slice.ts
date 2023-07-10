import { RootState } from "../../reducers/persistedReducer";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const baseQuery = fetchBaseQuery({
  validateStatus(response, body) {
    return [200, 201, 400, 409, 404, 401].includes(response.status);
  },
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    // headers.set("Content-Type", "multipart/form-data");
    const token = (getState() as RootState)?.auth?.auth?.token;
    console.log("token" + token);
    if (token) {
      headers.set("Authorization", `Bearer ${token.accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // console.log(args)
  let result = await baseQuery(args, api, extraOptions);
  if (result.meta?.response?.status === 401 || result.meta?.response?.status === 403) {
    console.log("unauthrozied");
    // localStorage.clear();
    // window.location.replace("/login");
  }
  return result;
};
