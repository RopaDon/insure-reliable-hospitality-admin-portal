import Image from "next/image";
import { Employee } from "@/config/types";
import { calculateAge } from "@/components/utils/utils";
import { Popover, Transition } from "@headlessui/react";
import BlankAvatar from "@/assets/images/blank_avatar.webp";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

interface Props {
  isSelected: boolean;
  employee: Employee;
  onCheckboxChange: (id: number, checked: boolean) => void;
  refetch(): QueryActionCreatorResult<any> | null | undefined;
}

export default function EmployeeTableItem({ employee, onCheckboxChange, refetch, isSelected }: Props) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(employee.id, e.target.checked);
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
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <Image className="rounded-full" src={employee.displayPhoto ?? BlankAvatar} width={40} height={40} alt={employee.firstName} />
          </div>
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {employee.firstName} &nbsp; {employee.lastName}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{employee.email ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">N/A</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium text-emerald-500">{calculateAge(employee.dateOfBirth)}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium text-sky-500">{employee.phoneNumber ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">{employee.dollarRate}</div>
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
