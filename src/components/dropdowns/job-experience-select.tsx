"use client";
import DropdownFull from "../dropdown-full";
import { useEffect, useState } from "react";
import { DropdownOption, Query } from "@/config/types";
import { useGetJobExperienceQuery } from "@/redux/slices/api/job-slice";

type Props = {
  error?: boolean | null;
  value?: number | string | null;
  onSelect?: (selected: DropdownOption) => void;
};

export default function JobExperienceSelect({ value, onSelect, error = true }: Props) {
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

  const { data, isFetching, isError, isSuccess } = useGetJobExperienceQuery(query, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!isError && !isFetching && isSuccess && data != null) {
      const industries = data.data?.map((item) => ({ id: item.id, value: item.name }));
      setOptions(industries);
    }
  }, [isError, isSuccess, isFetching]);

  useEffect(() => {
    if (value) {
      const selected = options.find((o) => o.id == value);

      if (selected) {
        setSelectedOption(selected!);
      }
    }
  }, [value]);

  return <DropdownFull options={options} onSelect={handleSelect} selected={selectedOption} error={error} />;
}
