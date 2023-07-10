import DropdownFull from "../dropdown-full";
import { useEffect, useState } from "react";
import { DropdownOption, Query } from "@/config/types";
import { useGetCountriesQuery } from "@/redux/slices/api/service-slice";

type Props = {
  error?: boolean | null;
  value?: string | null;
  onSelect?: (selected: DropdownOption) => void;
};

export default function CountrySelect({ value, onSelect, error = true }: Props) {
  const [countryOptions, setCountryOptions] = useState<DropdownOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<DropdownOption | null>(null);

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
  });

  const handleCountrySelect = (option: DropdownOption) => {
    setSelectedCountry(option);

    if (onSelect) {
      onSelect(option);
    }
  };

  const {
    data: countryData,
    isFetching: isFetchingCountries,
    isError: isErrorCountries,
    isSuccess: isSuccessCountries,
  } = useGetCountriesQuery(query, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!isErrorCountries && !isFetchingCountries && isSuccessCountries && countryData?.data != null) {
      const countries = countryData.data?.map((item) => ({ id: item.code, value: item.name }));
      setCountryOptions(countries);

      var selected: DropdownOption;

      if (value) {
        const country = countryData.data?.find((p) => p.code == value)!;
        selected = { id: country.code, value: country.name };
      } else {
        selected = { id: countryData.data[0].code, value: countryData.data[0].name };
      }

      setSelectedCountry(selected);
    }
  }, [isErrorCountries, isSuccessCountries, isFetchingCountries]);

  return (
    <>
      <DropdownFull options={countryOptions} onSelect={handleCountrySelect} selected={selectedCountry} error={error} />
    </>
  );
}
