import { DefaultToastOptions } from "react-hot-toast";

export const toastOptions: DefaultToastOptions = {
  error: {
    duration: 10000,
    style: { backgroundColor: "#EE4B46", color: "white" },
    iconTheme: {
      primary: "white",
      secondary: "#EE4B46",
    },
  },
  success: {
    duration: 4000,
    style: { backgroundColor: "#5cb85c", color: "white" },
    iconTheme: {
      primary: "white",
      secondary: "#5cb85c",
    },
  },
};
