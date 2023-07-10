"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Waitlist } from "@/config/types";
import { useForm } from "react-hook-form";
import { FormState } from "@/config/enums/enums";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DisplayMessages from "@/config/constants/message";
import BlankAvatar from "@/assets/images/blank_avatar.webp";
import { WaitlistSchema } from "@/config/constants/schemas";
import IndustrySelect from "@/components/dropdowns/industry-select";
import { useCreateClientMutation } from "@/redux/slices/api/client-slice";
import JobExperienceSelect from "@/components/dropdowns/job-experience-select";
import { useCreateWaitlistUserMutation } from "@/redux/slices/api/waitlist-slice";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

type Props = {
  state: FormState;
  waitlist?: Waitlist;
  handleClose: () => void;
  refetch(): QueryActionCreatorResult<any> | null | undefined;
};

export default function WaitlistForm({ waitlist, state, handleClose, refetch }: Props) {
  const [loading, setLoading] = useState(false);
  const isCreating = state === FormState.Creation;

  const [displayPhoto, setDisplayPhoto] = useState<File | Blob | null>(null);

  const [createWaitlistMutation] = useCreateWaitlistUserMutation();

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WaitlistSchema),
  });

  const countryIso = watch<"country">("country");
  const industryId = watch<"industryId">("industryId");
  const jobExperienceLevelId = watch<"jobExperienceLevelId">("jobExperienceLevelId");

  // METHODS
  const hydrateForm = () => {
    setValue<"email">("email", waitlist?.email!);
    setValue<"country">("country", waitlist?.country!);
    setValue<"lastName">("lastName", waitlist?.lastName!);
    setValue<"firstName">("firstName", waitlist?.firstName!);
    setValue<"industryId">("industryId", waitlist?.industry.id!);
    setValue<"phoneNumber">("phoneNumber", waitlist?.phoneNumber!);
    setValue<"jobExperienceLevelId">("jobExperienceLevelId", waitlist?.jobExperienceLevel.id!);
  };

  const createWaitlistUser = async (form: any) => {
    setLoading((prevState) => !prevState);

    try {
      const { success, errors } = await createWaitlistMutation(form).unwrap();

      if (!success && errors.length > 0) {
        toast.error(errors[0].message);
        return;
      }

      refetch();

      handleClose();

      toast.success(DisplayMessages.Waitlist.CREATE_WAITLIST);
    } catch (err) {
      toast.error(DisplayMessages.GENERIC_ERROR);
    } finally {
      setLoading((prevState) => !prevState);
    }
  };

  const updateClient = async (form: any) => {};

  useEffect(() => {
    if (!isCreating) {
      hydrateForm();
    }
  }, []);

  return (
    <div>
      {/* Modal content */}
      <div className="px-5 pt-4 pb-1">
        <div className="text-sm">
          <div className="font-normal text-sm text-slate-500 dark:text-slate-100 mb-2">
            Using this interface you can {state.toLowerCase()} a waitlist on the platform. A waitlist user is an individual who has expressed interest in a
            product, service, or event but is currently on a waitlist for access or availability.
          </div>

          <div className="flex items-center space-y-0 space-x-4 mt-8">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1 " htmlFor="name">
                First Name<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.firstName && "border-rose-500"}`}
              />
              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="name">
                {errors.firstName?.message}
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Last Name<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.lastName && "border-rose-500"}`}
              />
              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="email">
                {errors.lastName?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-5">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Email
              </label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.email && "border-rose-500"}`}
              />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="representative">
                {errors.email?.message}
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.phoneNumber && "border-rose-500"}`}
              />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="phoneNumber">
                {errors.phoneNumber?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Industry<span className="text-rose-500">*</span>
              </label>
              <IndustrySelect value={industryId} onSelect={(option) => setValue("industryId", option?.id, { shouldValidate: true })} />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="representative">
                {errors.industryId?.message}
              </label>
            </div>
          </div>
          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="country">
                Country<span className="text-rose-500">*</span>
              </label>
              <JobExperienceSelect value={countryIso} onSelect={(option) => setValue("country", option?.id, { shouldValidate: true })} />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="country">
                {errors.country?.message}
              </label>
            </div>
          </div>
          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Job Expereince Level<span className="text-rose-500">*</span>
              </label>
              <JobExperienceSelect value={jobExperienceLevelId} onSelect={(option) => setValue("jobExperienceLevelId", option?.id, { shouldValidate: true })} />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="jobExperienceLevelId">
                {errors.jobExperienceLevelId?.message}
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Modal footer */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap justify-end space-x-2">
          <button
            className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
            onClick={handleClose}
          >
            Close
          </button>
          {isCreating ? (
            <button disabled={loading} onClick={handleSubmit(createWaitlistUser)} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
              {loading ? <CircularProgress style={{ height: 23, width: 23, color: "white" }} /> : <span>Create</span>}
            </button>
          ) : (
            <button disabled={loading} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleSubmit(updateClient)}>
              {loading ? <CircularProgress style={{ height: 23, width: 23, color: "white" }} /> : <span>Update</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
