import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigFile from "../../../tailwind.config.js";
import { Environments } from "../../config/enums/enums.js";

export const tailwindConfig = resolveConfig(tailwindConfigFile) as any;

export const getBreakpointValue = (value: string): number => {
  const screenValue = tailwindConfig.theme.screens[value];
  return +screenValue.slice(0, screenValue.indexOf("px"));
};

export const getBreakpoint = () => {
  let currentBreakpoint;
  let biggestBreakpointValue = 0;
  let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  for (const breakpoint of Object.keys(tailwindConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (breakpointValue > biggestBreakpointValue && windowWidth >= breakpointValue) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};

export const hexToRGB = (h: string): string => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = parseInt(`0x${h[1]}${h[1]}`);
    g = parseInt(`0x${h[2]}${h[2]}`);
    b = parseInt(`0x${h[3]}${h[3]}`);
  } else if (h.length === 7) {
    r = parseInt(`0x${h[1]}${h[2]}`);
    g = parseInt(`0x${h[3]}${h[4]}`);
    b = parseInt(`0x${h[5]}${h[6]}`);
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value: number): string =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatThousands = (value: number): string =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const toQueryString = (obj: object) => {
  const keyValuePairs = Object.entries(obj).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  return keyValuePairs.join("&");
};

export const calculateAge = (dateOfBirth: string | null | undefined) => {
  if (!dateOfBirth) {
    return "N/A";
  }
  const dob = new Date(dateOfBirth);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - dob.getTime();

  // Convert milliseconds to years
  const ageDate = new Date(diffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age;
};

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export const getDomain = () => {
  // if (process.env.NODE_ENV == "development") {
  //   return process.env.NEXT_PUBLIC_DEV_API_URL;
  // } else if (process.env.NODE_ENV == "production") {
  //   return process.env.NEXT_PUBLIC_PROD_API_URL;
  // }

  return process.env.NEXT_PUBLIC_PROD_API_URL;
};
