import { baseQueryWithReauth } from "./base-slice";
import { toQueryString } from "@/components/utils/utils";
import { ApiMethods, BaseEndpoints } from "@/config/enums/enums";
import { TagDescription, createApi } from "@reduxjs/toolkit/query/react";
import { ApiResult, Employee, OptionSets, Pagination, Query } from "@/config/types";

const descriptionTags = ["Employee"] as readonly TagDescription<"Employee">[] & string[];

export const employeeSlice = createApi({
  reducerPath: "employees",
  tagTypes: descriptionTags,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getEmployees: builder.query<ApiResult<Pagination<Employee>>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Employee}?${toQueryString(params)}`,
      }),
    }),
    getEmployeeStatuses: builder.query<ApiResult<OptionSets[]>, Query>({
      query: (params) => ({
        method: ApiMethods.GET,
        url: `/${BaseEndpoints.Employee}/status`,
      }),
    }),
  }),
});
export const { useGetEmployeesQuery, useGetEmployeeStatusesQuery } = employeeSlice;
