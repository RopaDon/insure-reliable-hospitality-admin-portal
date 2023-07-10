import "@/assets/css/style.css";

import Theme from "./theme-provider";
import AppProvider from "./app-provider";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "@/config/constants/constants";
import AuthenticationProvider from "./auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Insure Reliable Hospitality Admin Portal",
  description: "A system to help the operating managers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}>
        <Theme>
          <AppProvider>
            <Toaster toastOptions={toastOptions} />
            <ReduxProvider>
              <AuthenticationProvider>{children}</AuthenticationProvider>
            </ReduxProvider>
          </AppProvider>
        </Theme>
      </body>
    </html>
  );
}
