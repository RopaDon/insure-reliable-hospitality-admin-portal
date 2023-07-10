"use client";
import DropdownFull from "../dropdown-full";
import { useEffect, useState } from "react";
import { DropdownOption, Query } from "@/config/types";
import { useGetIndustriesQuery } from "@/redux/slices/api/industry-slice";
import { useGetClientStatusesQuery } from "@/redux/slices/api/client-slice";
import { useGetEmployeeStatusesQuery } from "@/redux/slices/api/employee-slice";

type Props = {
  error?: boolean | null;
  value?: number | string | null;
  onSelect?: (selected: DropdownOption) => void;
};

export default function EmployeeStatusSelect({ value, onSelect, error = true }: Props) {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
  });

  const handleOnSearch = (searchTerm: string) => {
    const queryParmas = {
      ...query,
      ...{ searchTerm },
    };

    setQuery(queryParmas);
  };

  const handleSelect = (option: DropdownOption) => {
    if (onSelect) {
      onSelect(option);
    }
    setSelectedOption(option);
  };

  const { data, isFetching, isError, isSuccess } = useGetEmployeeStatusesQuery(query, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!isError && !isFetching && isSuccess && data != null) {
      const result = data.data?.map((item) => ({ id: item.id, value: item.name }));
      setOptions(result);

      if (onSelect && result) {
        onSelect(result[0]);
      }
    }
  }, [isError, isSuccess, isFetching]);

  useEffect(() => {
    if (value) {
      setSelectedOption({ value: value.toString(), id: 1 });
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      const selected = options.find((o) => o.id == value);

      if (selected) {
        setSelectedOption(selected);
      }
    }
  }, [value, options]);

  return <DropdownFull options={options} onSelect={handleSelect} selected={selectedOption} error={error} />;
}
