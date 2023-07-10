"use client";

import { SearchBar } from "./search-bar";
import { useEffect, useState } from "react";
import { DropdownOption } from "@/config/types";
import { Menu as MuiMenu } from "@mui/material";
import { Menu, Transition } from "@headlessui/react";

type Props = {
  error: boolean | null;
  options: DropdownOption[];
  selected?: DropdownOption | null;
  onSearch?: (searchTerm: string) => void;
  onSelect?: (selected: DropdownOption) => void;
};

export default function DropdownFull({ options, onSearch, selected, onSelect, error }: Props) {
  const [selectedItem, setSelected] = useState<any>(0);
  const [displayText, setDisplayText] = useState("");
  const [searchTermInput, setSearchTermInput] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const filteredOptions = options?.filter((option) => option.value.toLowerCase().includes(searchTermInput.toLowerCase()));

  useEffect(() => {
    if (selected && selected.id) {
      const selectedValue = options?.find((o) => o.id == selected.id)!;
      setDisplayText(selectedValue?.value);
    } else if (options?.length > 0) {
      setDisplayText(options[0]?.value);
    }
  }, [options]);

  const handleSearch = (searchTerm: string) => {
    setSearchTermInput(searchTerm);
  };

  const handleSelect = (option: DropdownOption, index: number) => {
    if (onSelect) {
      onSelect(option);
    }

    setSelected(index);
    setDisplayText(option.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu as="div" className="relative inline-flex w-full">
      {({ open }) => (
        <>
          <Menu.Button
            onClick={handleClick}
            className={`btn w-full justify-between min-w-[11rem] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 ${
              error ? "border-red-500" : ""
            }`}
            aria-label="Select option"
          >
            <span className="flex items-center">
              <span>{displayText}</span>
            </span>
            <svg className="shrink-0 ml-1 fill-current text-slate-400" width="11" height="7" viewBox="0 0 11 7">
              <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
            </svg>
          </Menu.Button>
          <Transition
            className="z-50 max-h-60 overflow-y-auto absolute top-full left-0 w-full overflow-hidden mt-1"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MuiMenu
              open={open}
              id="basic-menu"
              anchorEl={anchorEl}
              style={{ width: 20000 }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Menu.Items className="z-50 font-medium text-sm text-slate-600 dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-700 focus:outline-none">
                <div className="px-3 py-3">
                  <SearchBar value={searchTermInput} onChange={handleSearch} />
                </div>
                {filteredOptions?.map((option, optionIndex) => (
                  <Menu.Item key={optionIndex}>
                    {({ active }) => (
                      <button
                        className={`flex items-center justify-between w-full py-2 px-3 cursor-pointer ${active ? "bg-slate-50 dark:bg-slate-700/20" : ""} ${
                          optionIndex === selectedItem && "text-indigo-500"
                        }`}
                        onClick={() => handleSelect(option, optionIndex)}
                      >
                        <span>{option.value}</span>
                        <svg
                          className={`shrink-0 mr-2 fill-current text-indigo-500 ${optionIndex !== selectedItem && "invisible"}`}
                          width="12"
                          height="9"
                          viewBox="0 0 12 9"
                        >
                          <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                        </svg>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </MuiMenu>
          </Transition>
        </>
      )}
    </Menu>
  );
}
