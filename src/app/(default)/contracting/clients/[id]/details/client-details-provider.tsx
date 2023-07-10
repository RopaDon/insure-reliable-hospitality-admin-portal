"use client";

import Center from "@/components/center";
import { useParams } from "next/navigation";
import ClientDetails from "./client-details";
import AppLoading from "@/components/app-loading";
import ErrorDisplay from "@/components/error-display";
import { useGetClientQuery } from "@/redux/slices/api/client-slice";

export default function ClientDetailsProvider() {
  const { id } = useParams();

  const { data, isFetching, isSuccess, isError, refetch } = useGetClientQuery({ id });

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
      {!isError && !isFetching && isSuccess && data.success && <ClientDetails client={data.data} refetch={refetch} />}
    </>
  );
}
