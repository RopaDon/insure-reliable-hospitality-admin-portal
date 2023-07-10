import Link from "next/link";
import Image from "next/image";
import { Integration } from "@/config/types";
import { useState } from "react";

type Props = {
  integration: Integration;
};

export default function IntegrationCard({ integration }: Props) {
  const [selected, setSelected] = useState(false);

  const handleCardClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      className={`col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-md border ${
        selected ? "border-indigo-700" : "border-slate-200 dark:border-slate-700"
      } transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col h-full p-5">
        <header>
          <div className="flex items-center justify-between">
            <div className="flex shrink-0 -space-x-3 -ml-px"></div>
          </div>
        </header>
        <div className="grow mt-2">
          {/* <div>
            <Image height={40} width={40} src={integration.logo} alt="Logo" />
            <h2 className="text-xl leading-snug font-semibold">{integration.platformName}</h2>
          </div> */}
          <h2 className="text-xl leading-snug font-bold">{integration.platformName}</h2>
          <div className="text-xs">{integration.description}</div>
        </div>
        <footer className="mt-5">
          <div className="text-sm font-medium text-slate-500 mb-2">{integration?.expiryDate}</div>
          <div className="flex justify-between items-center">
            <div>
              <div
                className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400`}
              >
                {integration.integrationType.name}
              </div>
            </div>
            <div></div>
          </div>
        </footer>
      </div>
    </div>
  );
}
