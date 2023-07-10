"use client";

import JobTable from "./job-table";
import { Query } from "@/config/types";
import { useEffect, useState } from "react";
import DateSelect from "@/components/dropdowns/date-select";
import { SearchBar } from "@/components/search-bar";
import DeleteButton from "@/components/delete-button";
import ErrorDisplay from "@/components/error-display";
import FilterButton from "@/components/dropdown-filter";
import { useGetJobsQuery } from "@/redux/slices/api/job-slice";
import PaginationClassic from "@/components/pagination-classic";
import { LoadingIndicator } from "@/components/loading-indicator";

export default function JobContent() {
  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
  });

  const [isMounted, setIsMounted] = useState(false);

  const { data, isFetching, isError } = useGetJobsQuery(query, { refetchOnMountOrArgChange: true });

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

  const hasContent = !isFetching && data?.success && data?.errors?.length === 0;
  const hasError = !isFetching && ((data?.errors?.length! > 0 && !data?.success) || isError);

  // Update the initial loading state after the first loading
  useEffect(() => {}, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Jobs ✨</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton />
          {/* Search */}
          <SearchBar onChange={handleOnSearch} />
          {/* Dropdown */}
          <DateSelect onChange={handleDateChange} />
          {/* Filter button */}
          <FilterButton align="right" />

          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">Export</button>

          {/* Add customer button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add Job</span>
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center mt-5">
          <LoadingIndicator />
        </div>
      )}

      {hasContent && <JobTable jobs={data?.data.items!} total={data.data.meta.total} />}

      {hasContent && (
        <div className="mt-8">
          <PaginationClassic metadata={data?.data.meta!} onChange={handlePaginationChange} />
        </div>
      )}

      {hasError && <ErrorDisplay message={data?.errors[0]?.message ?? "An error occured fetching your job listing"} />}
    </div>
  );
}
