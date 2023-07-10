import Image from "next/image";
import { Job } from "@/config/types";
import { calculateAge } from "@/components/utils/utils";
import { Popover, Transition } from "@headlessui/react";
import BlankAvatar from "@/assets/images/blank_avatar.webp";

interface CustomersTableItemProps {
  job: Job;
  isSelected: boolean;
  onCheckboxChange: (id: number, checked: boolean) => void;
}

export default function EmployeeTableItem({ job, onCheckboxChange, isSelected }: CustomersTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(job.id, e.target.checked);
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input className="form-checkbox" type="checkbox" onChange={handleCheckboxChange} checked={isSelected} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center relative">
          <button>
            <svg className={`w-4 h-4 shrink-0 fill-current text-slate-300 dark:text-slate-600`} viewBox="0 0 16 16">
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </button>
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{job.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{job.description}</div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
        <button className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
          <span className="sr-only">Menu</span>
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

function JobActions() {
  return (
    <Popover className="relative inline-flex">
      <Popover.Button className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
        <button className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
          <span className="sr-only">Menu</span>
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
      </Popover.Button>
      <Transition
        className={`origin-top-right z-10 absolute top-full left-0 right-auto min-w-[14rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 md:left-auto md:right-0
`}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel>
          {({ close }) => (
            <>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">Filters</div>
              <ul className="mb-4">
                <li className="py-1 px-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm font-medium ml-2">Direct VS Indirect</span>
                  </label>
                </li>
                <li className="py-1 px-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm font-medium ml-2">Real Time Value</span>
                  </label>
                </li>
                <li className="py-1 px-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm font-medium ml-2">Top Channels</span>
                  </label>
                </li>
                <li className="py-1 px-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm font-medium ml-2">Sales VS Refunds</span>
                  </label>
                </li>
                <li className="py-1 px-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm font-medium ml-2">Last Order</span>
                  </label>
                </li>
                <li className="py-1 px-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm font-medium ml-2">Total Spent</span>
                  </label>
                </li>
              </ul>
              <div className="py-2 px-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20">
                <ul className="flex items-center justify-between">
                  <li>
                    <button className="btn-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-200">
                      Clear
                    </button>
                  </li>
                  <li>
                    <button className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => close()}>
                      Apply
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
