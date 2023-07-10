"use client";

import { Query } from "@/config/types";
import { useEffect, useState } from "react";
import DocumentTable from "./document-table";
import SearchForm from "@/components/search-form";
import DeleteButton from "@/components/delete-button";
import ErrorDisplay from "@/components/error-display";
import PaginationClassic from "@/components/pagination-classic";
import { LoadingIndicator } from "@/components/loading-indicator";
import { useGetDocumentsQuery } from "@/redux/slices/api/document-slice";

export default function DocumentsContent() {
  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
  });

  const { data, isFetching, isError } = useGetDocumentsQuery(query, { refetchOnMountOrArgChange: true });

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
    <div className="relative bg-white dark:bg-slate-900 h-full">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-4 md:mb-2">
          {/* Left: Title */}
          {/* Filters */}
          <div className="mb-5">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Documents ✨</h1>
            </div>
            <ul className="flex flex-wrap -m-1 mt-2">
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                  View All
                </button>
              </li>
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">
                  Template
                </button>
              </li>
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">
                  Compliance
                </button>
              </li>
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">
                  Business
                </button>
              </li>
            </ul>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
            <DeleteButton />

            {/* Search form */}
            <div className="hidden sm:block">
              <SearchForm />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center mt-5">
            <LoadingIndicator />
          </div>
        )}

        {hasContent && <DocumentTable documents={data?.data.items!} />}

        {hasContent && (
          <div className="mt-8">
            <PaginationClassic metadata={data?.data.meta!} onChange={handlePaginationChange} />
          </div>
        )}

        {hasError && <ErrorDisplay message={data?.errors[0]?.message ?? "An error occured fetching your documents "} />}
      </div>
    </div>
  );
}
