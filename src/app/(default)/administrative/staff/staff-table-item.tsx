import { Waitlist } from "@/config/types";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

import moment from "moment";

interface CustomersTableItemProps {
  user: any;
  isSelected: boolean;
  refetch(): QueryActionCreatorResult<any>;
  onCheckboxChange: (id: number, checked: boolean) => void;
}

export default function StaffTableItem({ user, refetch, onCheckboxChange, isSelected }: CustomersTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(user.id, e.target.checked);
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

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{user.firstName ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{user.lastName ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{user.email ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{user.phoneNumber ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-xs inline-flex font-medium bg-emerald-100 dark:bg-sky-400/30 text-emerald-600 dark:text-sky-400 rounded-full text-left px-2.5 py-1">
          {user.role.name}
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{moment(new Date(user.createdOn)).format("LL")}</div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"></td>
    </tr>
  );
}
