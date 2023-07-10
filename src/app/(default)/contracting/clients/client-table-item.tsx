import Link from "next/link";
import Image from "next/image";
import { Client } from "@/config/types";
import ClientOptions from "./client-options";
import BlankAvatar from "@/assets/images/blank_avatar.webp";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

interface CustomersTableItemProps {
  client: Client;
  isSelected: boolean;
  refetch(): QueryActionCreatorResult<any>;
  onCheckboxChange: (id: number, checked: boolean) => void;
}

export default function ClientTableItem({ client, refetch, onCheckboxChange, isSelected }: CustomersTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(client.id, e.target.checked);
  };

  const statusColor = (status: string): string => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400";
      case "Inactive":
        return "bg-rose-100 dark:bg-rose-500/30 text-rose-500 dark:text-rose-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400";
    }
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
            <Image className="rounded-full" src={client.displayPhoto ?? BlankAvatar} width={40} height={40} alt={client.name} />
          </div>
          <div className="font-medium text-slate-800 dark:text-slate-100">
            <Link href={`/contracting/clients/${client.id}/details`}>{client.name}</Link>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{client.email ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`text-xs inline-flex font-medium ${statusColor(client.status.name)} rounded-full text-center px-2.5 py-1`}>{client.status.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium text-emerald-500">{client?.address.addressLine1 ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium text-sky-500">{client.phoneNumber ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">{client?.representative ?? "N/A"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <ClientOptions clientId={client.id} refetch={refetch} />
      </td>
    </tr>
  );
}
