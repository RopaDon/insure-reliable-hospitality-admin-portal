"use client";

import { Query } from "@/config/types";
import Center from "@/components/center";
import EmployeeTable from "./employee-table";
import { useEffect, useState } from "react";
import AddEmployeeButton from "./add-employee";
import AppLoading from "@/components/app-loading";
import DateSelect from "@/components/dropdowns/date-select";
import { SearchBar } from "@/components/search-bar";
import EmployeeExportButton from "./export-employee";
import DeleteButton from "@/components/delete-button";
import ErrorDisplay from "@/components/error-display";
import PaginationClassic from "@/components/pagination-classic";
import { useGetEmployeesQuery } from "@/redux/slices/api/employee-slice";

export default function EmployeeContent() {
  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
  });

  const { data, isFetching, refetch } = useGetEmployeesQuery(query, { refetchOnMountOrArgChange: true });

  const handleOnSearch = (searchTerm: string) => {
    const queryParmas = {
      ...query,
      ...{ searchTerm },
    };

    setQuery(queryParmas);
  };

  const handleDateChange = (datePeriod: string) => {
    const queryParmas = {
      ...query,
      ...{ datePeriod },
    };

    setQuery(queryParmas);
  };

  const handleFilterChange = (searchTerm: string) => {
    const queryParmas = {
      ...query,
      ...{ searchTerm },
    };

    setQuery(queryParmas);
  };

  const handlePaginationChange = (limit: number, page: number) => {
    const queryParmas = {
      ...query,
      ...{ limit, page },
    };

    setQuery(queryParmas);
  };

  // Check if it's the initial loading of the query
  const isLoading = isFetching;

  const hasError = !isFetching && data?.errors?.length! > 0 && !data?.success;
  const hasContent = !isFetching && data?.success && data?.errors?.length === 0;

  // Update the initial loading state after the first loading
  useEffect(() => {}, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Employees ✨</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton />
          {/* Search */}
          <SearchBar onChange={handleOnSearch} />
          {/* Dropdown */}
          <DateSelect onChange={handleDateChange} />

          <EmployeeExportButton />

          <AddEmployeeButton refetch={refetch} />
        </div>
      </div>

      {isLoading && (
        <Center>
          <AppLoading color="#3F51B5" height={30} width={30} />
        </Center>
      )}

      {hasContent && <EmployeeTable employees={data?.data.items!} total={data.data.meta.total} refetch={refetch} />}

      {hasContent && (
        <div className="mt-8">
          <PaginationClassic metadata={data?.data.meta!} onChange={handlePaginationChange} />
        </div>
      )}

      {hasError && <ErrorDisplay message={data?.errors[0]?.message} />}
    </div>
  );
}
