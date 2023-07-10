import DropdownFull from "../dropdown-full";
import { useEffect, useState } from "react";
import { DropdownOption, Query } from "@/config/types";
import { useGetCountriesQuery, useGetProvincesByCountryQuery } from "@/redux/slices/api/service-slice";

type ProvinceSelectProps = {
  value?: string | null;
  error?: boolean | null;
  countryIso?: string | null;
  onSelect: (option: DropdownOption) => void;
};

export default function ProvinceSelect({ countryIso, onSelect, value, error = true }: ProvinceSelectProps) {
  const [provinceOptions, setProvinceOptions] = useState<DropdownOption[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<DropdownOption | null>(null);

  const { data, isFetching, isError, isSuccess } = useGetProvincesByCountryQuery({ iso: countryIso }, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!isError && !isFetching && isSuccess && data?.data != null && data?.data?.length > 0) {
      const provinces = data?.data.map((item) => ({ id: item.code, value: item.name }));
      setProvinceOptions(provinces);
    }
  }, [isError, isSuccess, isFetching, countryIso]);

  useEffect(() => {
    if (value) {
      const selected = provinceOptions.find((o) => o.id == value);

      if (selected) {
        setSelectedProvince(selected);
      }
    }
  }, [value, provinceOptions]);

  const handleProvinceSelect = (option: DropdownOption) => {
    onSelect(option);
    setSelectedProvince(option);
  };

  return <DropdownFull options={provinceOptions} onSelect={handleProvinceSelect} selected={selectedProvince} error={error} />;
}
