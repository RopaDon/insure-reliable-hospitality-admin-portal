"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import AuthImage from "../auth-image";
import { Admin } from "@/config/types";
import AuthHeader from "../auth-header";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/redux/slices/local/auth.slice";
import { RootState } from "@/redux/reducers/persistedReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthenticationSchema } from "@/config/constants/schemas";
import { toggleLoading } from "@/redux/slices/local/loading-slice";
import { useAuthenticateAdminMutation } from "@/redux/slices/api/auth-slice";
import AppLoading from "@/components/app-loading";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector<RootState, any>((state) => state.loading);
  const [authenticateAdminMutation, response] = useAuthenticateAdminMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AuthenticationSchema),
  });

  const handleAuthentication = async (formData: any) => {
    dispatch(toggleLoading());

    try {
      const { username, password } = formData;

      const { errors, success, data } = await authenticateAdminMutation({
        username,
        password,
      }).unwrap();

      if (!success && errors.length > 0) {
        dispatch(toggleLoading());
        return;
      }

      const token = data!;

      const { accessToken } = token;

      const user = jwt_decode<{ user: Admin }>(accessToken);

      dispatch(
        setAuth({
          token,
          user: user.user,
        })
      );

      router.push("/dashboard");
    } catch (err) {
      toast.error(String(err));
    }

    dispatch(toggleLoading());
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const hasError = response.data !== undefined && response.data.errors.length > 0;

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! ✨</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      Username
                    </label>
                    <input
                      id="username"
                      {...register("username", {
                        required: true,
                        maxLength: 80,
                      })}
                      className={`form-input w-full pr-10 ${hasError ? "border-red-500" : ""}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        autoComplete="on"
                        {...register("password", {
                          required: true,
                          maxLength: 80,
                        })}
                        type={showPassword ? "text" : "password"}
                        className={`form-input w-full pr-10 ${hasError ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </button>
                    </div>
                  </div>
                  {hasError && (
                    <div className="text-red-700 text-sm">
                      {response.data!.errors.map((error, index) => (
                        <p key={index}>{error.message}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" href="/reset-password">
                      Forgot Password?
                    </Link>
                  </div>
                  <Link href="#" onClick={handleSubmit(handleAuthentication)} className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
                    {isLoading ? <AppLoading /> : <span>Sign In</span>}
                  </Link>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700"></div>
            </div>
          </div>
        </div>
        <AuthImage />
      </div>
    </main>
  );
}
