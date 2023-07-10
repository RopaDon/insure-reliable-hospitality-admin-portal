"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Client } from "@/config/types";
import { useForm } from "react-hook-form";
import { FormState } from "@/config/enums/enums";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DisplayMessages from "@/config/constants/message";
import { ClientSchema } from "@/config/constants/schemas";
import BlankAvatar from "@/assets/images/blank_avatar.webp";
import CountrySelect from "@/components/dropdowns/country-select";
import IndustrySelect from "@/components/dropdowns/industry-select";
import ProvinceSelect from "@/components/dropdowns/province-select";
import { useCreateClientMutation } from "@/redux/slices/api/client-slice";
import ClientStatusSelect from "@/components/dropdowns/client-status-select";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

type Props = {
  client?: Client;
  state: FormState;
  handleClose: () => void;
  refetch(): QueryActionCreatorResult<any> | null | undefined;
};

export default function ClientForm({ client, state, handleClose, refetch }: Props) {
  const [loading, setLoading] = useState(false);
  const isCreating = state === FormState.Creation;
  const uploadInputRef = useRef<any>(null as any);
  const [displayUrl, setDisplayUrl] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [displayPhoto, setDisplayPhoto] = useState<File | Blob | null>(null);

  const [createClientMutation] = useCreateClientMutation();

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClientSchema),
  });

  const industry = watch<"industry">("industry");
  const province = watch<"province">("province");
  const countryIso = watch<"country">("country", "AF");
  const statusId = watch<"clientStatusId">("clientStatusId");
  // METHODS

  const hydrateForm = () => {
    setDisplayUrl(client?.displayPhoto ?? "");

    setValue<"city">("city", client?.address.city!);
    setValue<"country">("country", client?.address.country!);
    setValue<"province">("province", client?.address.province!);
    setValue<"postalCode">("postalCode", client?.address.postalCode!);
    setValue<"addressLine1">("addressLine1", client?.address.addressLine1!);
    setValue<"addressLine2">("addressLine2", client?.address.addressLine2!);

    setValue<"name">("name", client?.email!);
    setValue<"email">("email", client?.email!);
    setValue<"industry">("industry", client?.industryId!);
    setValue<"description">("description", client?.description!);
    setValue<"phoneNumber">("phoneNumber", client?.phoneNumber!);
    setValue<"clientStatusId">("clientStatusId", client?.statusId!);
    setValue<"representative">("representative", client?.representative!);
  };

  const handleReferenceClick = () => uploadInputRef.current && uploadInputRef.current.click();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files![0];
    const objectURL = URL.createObjectURL(file);

    setDisplayPhoto(file);
    setDisplayUrl(objectURL);
  };

  const createClient = async (form: any) => {
    setLoading((prevState) => !prevState);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("address[city]", form.city);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("description", form.description);
      formData.append("address[country]", form.country);
      formData.append("address[province]", form.province);
      formData.append("clientStatusId", form.clientStatusId);
      formData.append("representative", form.representative);
      formData.append("address[postalCode]", form.postalCode);
      formData.append("industryId", form.industry.toString());
      formData.append("address[addressLine1]", form.addressLine1);
      formData.append("address[addressLine2]", form.addressLine2);

      if (displayPhoto) {
        formData.append("displayPhoto", displayPhoto);
      }

      const { success, errors } = await createClientMutation(formData).unwrap();

      if (!success && errors.length > 0) {
        toast.error(errors[0].message);
        return;
      }

      refetch();

      handleClose();

      setModalOpen((prevState) => !prevState);
      toast.success(DisplayMessages.Client.CREATE_CLIENT);
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
            Using this interface you can {state.toLowerCase()} a client on the platform
          </div>
          <section className="flex justify-center items-center mt-6 ">
            <div>
              <div className="text-center">
                <Image
                  width={100}
                  height={100}
                  alt="User upload"
                  style={{ objectFit: "cover" }}
                  className="w-30 h-30 rounded-full mx-auto"
                  src={displayUrl.length > 0 ? displayUrl : BlankAvatar}
                />
              </div>
              <div>
                <input type="file" accept="image/*" ref={uploadInputRef} style={{ display: "none" }} onChange={(e) => handleUpload(e)} />
                <button onClick={handleReferenceClick} className="mt-4 ml-5 btn-sm bg-indigo-500 hover:bg-indigo-600 text-white mx-auto">
                  Upload
                </button>
              </div>
            </div>
          </section>

          <div className="flex items-center space-y-0 space-x-4 mt-8">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1 " htmlFor="name">
                Name<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.name && "border-rose-500"}`}
              />
              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="name">
                {errors.name?.message}
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Email<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.email && "border-rose-500"}`}
              />
              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="email">
                {errors.email?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-5">
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
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Representative
              </label>
              <input
                type="text"
                {...register("representative", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.representative && "border-rose-500"}`}
              />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="representative">
                {errors.representative?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Industry<span className="text-rose-500">*</span>
              </label>
              <IndustrySelect value={industry} onSelect={(option) => setValue("industry", option?.id, { shouldValidate: true })} />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="representative">
                {errors.industry?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Status<span className="text-rose-500">*</span>
              </label>
              <ClientStatusSelect value={statusId} onSelect={(option) => setValue("clientStatusId", option?.id, { shouldValidate: true })} />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="clientStatusId">
                {errors.clientStatusId?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Description<span className="text-rose-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.description && "border-rose-500"}`}
              />
              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="email">
                {errors.description?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-5"></div>

          <div className="font-medium text-sm text-slate-300 dark:text-slate-100 mb-5 mt-5">Address</div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Address Line 1<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("addressLine1", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.addressLine1 && "border-rose-500"}`}
              />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="addressLine1">
                {errors.addressLine1?.message}
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Address Line 2<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("addressLine2", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.addressLine2 && "border-rose-500"}`}
              />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="addressLine2">
                {errors.addressLine2?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Country<span className="text-rose-500">*</span>
              </label>
              <CountrySelect value={countryIso} onSelect={(option) => setValue("country", option?.id, { shouldValidate: true })} />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="city">
                {errors.country?.message}
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Province<span className="text-rose-500">*</span>
              </label>
              <ProvinceSelect value={province} countryIso={countryIso} onSelect={(option) => setValue("province", option?.id, { shouldValidate: true })} />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="city">
                {errors.province?.message}
              </label>
            </div>
          </div>

          <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                City<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("city", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.city && "border-rose-500"}`}
              />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="city">
                {errors.city?.message}
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                Postal Code<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("postalCode", {
                  required: true,
                  maxLength: 80,
                })}
                className={`form-input w-full ${errors.postalCode && "border-rose-500"}`}
              />

              <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="city">
                {errors.postalCode?.message}
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
            <button disabled={loading} onClick={handleSubmit(createClient)} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
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
