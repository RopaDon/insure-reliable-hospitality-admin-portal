import Image from "next/image";
import { Document } from "@/config/types";
import { useFlyoutContext } from "@/app/flyout-context";
import { useTransactionDetail } from "./document-context";

interface DocumentTableItemProps {
  document: Document;
  isSelected: boolean;
  onCheckboxChange: (id: number, checked: boolean) => void;
}

export default function DocumentTableItem({ document, onCheckboxChange, isSelected }: DocumentTableItemProps) {
  const { setFlyoutOpen } = useFlyoutContext();

  const { setTransaction } = useTransactionDetail();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(document.id, e.target.checked);
  };

  const handleDocumentClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setFlyoutOpen(true);
    setTransaction(document);
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
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
        <div className="flex items-center">
          <div className="font-medium text-slate-800 dark:text-slate-100">
            <button onClick={(e) => handleDocumentClick(e)}>{document.name}</button>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{document.description}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{document.size}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
        <div
          className={`text-left center text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400`}
        >
          {document.type}
        </div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{document.createdOn}</div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
