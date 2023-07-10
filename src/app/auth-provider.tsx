"use client";

import { useEffect } from "react";
import { Token } from "@/config/types";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/redux/reducers/persistedReducer";
// Whitelisted routes that don't require authentication
const whitelistRoutes = ["/login"];

type Props = {
  children: React.ReactNode;
};

export default function AuthenticationProvider({ children }: Props) {
  const router = useRouter();
  const token = useSelector<RootState, Token | undefined>((state) => state?.auth?.auth?.token);

  useEffect(() => {
    // Check if the current route is in the whitelist
    const isWhitelisted = whitelistRoutes.some((route) => window.location.pathname.startsWith(route));

    if (!token?.accessToken && !isWhitelisted) {
      router.replace("/login");
    }
  }, [token?.accessToken, router]);

  return <>{children}</>;
}
