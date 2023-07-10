"use client";

import Center from "@/components/center";
import { useParams } from "next/navigation";
import EmployeeDetails from "./employee-details";
import AppLoading from "@/components/app-loading";
import ErrorDisplay from "@/components/error-display";
import { useGetEmployeeQuery } from "@/redux/slices/api/employee-slice";

export default function EmployeeDetailsProvider() {
  const { id } = useParams();

  const { data, isFetching, isSuccess, isError, refetch } = useGetEmployeeQuery({ id });

  return (
    <>
      {isFetching && (
        <Center>
          <AppLoading color="indigo" height={30} width={30} />
        </Center>
      )}
      {isError ||
        (data?.errors?.length != null && data?.errors?.length > 0 && (
          <Center>
            <ErrorDisplay />
          </Center>
        ))}
      {!isError && !isFetching && isSuccess && data.success && <EmployeeDetails employee={data.data} refetch={refetch} />}
    </>
  );
}
