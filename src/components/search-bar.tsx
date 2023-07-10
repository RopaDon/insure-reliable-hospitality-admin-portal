"use client";

import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  value?: string | null | undefined;
  onChange: (searched: string) => void;
};

export function SearchBar(props: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      props.onChange(event.target.value);
    }, 200);

    setSearchTerm(event.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
    props.onChange("");
  };

  useEffect(() => {
    if (props.value && props.value?.length > 0) {
      setSearchTerm(props.value);
    }
  }, [props.value]);
  return (
    <div>
      <div className="relative">
        <input value={searchTerm} placeholder="Search" id="form-search" className="form-input w-full pl-9" type="search" onChange={onChange} />
        <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
          </svg>
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          {searchTerm.length > 0 && <CloseIcon onClick={onClear} />}
        </button>
      </div>
    </div>
  );
}
