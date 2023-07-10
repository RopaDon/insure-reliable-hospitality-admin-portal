"use client";

import { PaginationMeta } from "@/config/types";

type Props = {
  metadata?: PaginationMeta;
  onChange?: (limit: number, page: number) => void | null | undefined;
};

export default function PaginationClassic(props: Props) {
  const { metadata: { total = 0, perPage = 0, currentPage = 0, prev = null, next = null } = {} } = props;

  const handlePrevious = () => {
    if (prev !== null && props?.onChange) {
      props?.onChange(perPage, prev);
    }
  };

  const handleNext = () => {
    if (next !== null && props?.onChange) {
      props?.onChange(perPage, next);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 ${
                prev === null ? "opacity-50 cursor-not-allowed dark:text-slate-600" : "text-indigo-500 cursor-pointer"
              }`}
              onClick={handlePrevious}
              disabled={prev === null}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600  ${
                next === null ? "opacity-50 cursor-not-allowed dark:text-slate-600" : "text-indigo-500 cursor-pointer"
              }`}
              onClick={handleNext}
              disabled={next === null}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600 dark:text-slate-300">{currentPage}</span> to{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">{perPage}</span> of{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">{total}</span> results
      </div>
    </div>
  );
}
