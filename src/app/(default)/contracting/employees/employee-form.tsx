"use client";

import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import { fadeInRight } from "react-animations";
import AppCheckbox from "@/components/checkbox";
import Datepicker from "@/components/datepicker";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DisplayMessages from "@/config/constants/message";
import { Step, StepLabel, Stepper } from "@mui/material";
import JobSelect from "@/components/dropdowns/job-select";
import IntegrationCard from "@/components/integration-card";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClientSelect from "@/components/dropdowns/client-select";
import TransitionWrapper from "@/components/transition-wrapper";
import CountrySelect from "@/components/dropdowns/country-select";
import { toggleLoading } from "@/redux/slices/local/loading-slice";
import ProvinceSelect from "@/components/dropdowns/province-select";
import CurrencySelect from "@/components/dropdowns/currency-select";
import { EmployeeCreationSteps, FormState } from "@/config/enums/enums";
import { useCreateClientMutation } from "@/redux/slices/api/client-slice";
import EmployeeStatusSelect from "@/components/dropdowns/employee-status-select";
import { useGetPaymentIntegrationsQuery } from "@/redux/slices/api/integration-slice";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { AddressSchema, EmployeeBankingInformationSchema, EmployeeBasicInformationSchema } from "@/config/constants/schemas";
import { Client, CreateEmployeeDTO, Employee, Integration, NavigatorProps, StepProps } from "@/config/types";

type Props = {
  state: FormState;
  employee?: Employee;
  handleClose: () => void;
  refetch(): QueryActionCreatorResult<any> | null | undefined;
};

export default function EmployeeForm({ employee, state, handleClose, refetch }: Props) {
  const dispatch = useDispatch();
  const optionalSteps: number[] = [2];
  const [loading, setLoading] = useState(false);
  const isCreating = state === FormState.Creation;
  const [activeStep, setActiveStep] = useState(0);
  const [createClientMutation] = useCreateClientMutation();
  const [skipped, setSkipped] = useState(new Set<number>());
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<CreateEmployeeDTO | null>(null);

  const { Step1, Step2, Step3, Step4 } = EmployeeCreationSteps;

  const [steps, setSteps] = useState([
    {
      label: Step1,
      component: BasicInformationStep,
    },
    {
      label: Step2,
      component: AddressInformationStep,
    },
    {
      label: Step3,
      component: IntegrationStep,
    },
    {
      label: Step4,
      component: BankingInformationStep,
    },
  ]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const createEmployee = async (form: any) => {
    dispatch(toggleLoading());

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
      dispatch(toggleLoading());
    }
  };

  const updateEmployee = async (form: any) => {};

  const isStepOptional = (step: number) => {
    return optionalSteps.includes(step);
  };
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const onCapture = (capturedState: any) => {
    setData((prevState: any) => {
      return { ...prevState, ...capturedState };
    });
  };

  const currentStep = steps[activeStep];

  const StepComponent = currentStep.component;

  useEffect(() => {
    if (!isCreating) {
      // hydrateForm();
    }
  }, []);

  return (
    <div>
      {/* Modal content */}
      <div className="px-5 pt-4 pb-1">
        <div className="text-sm">
          <div className="font-normal text-sm text-slate-500 dark:text-slate-100 mb-2">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <div>Optional</div>;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label.label} {...stepProps}>
                    <StepLabel {...labelProps}>{label.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <StepComponent
              data={data}
              steps={steps}
              onCapture={onCapture}
              handleBack={handleBack}
              handleNext={handleNext}
              activeStep={activeStep}
              handleSkip={handleSkip}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicInformationStep(props: StepProps) {
  const { data, steps, activeStep, onCapture, handleBack, handleNext, handleSkip } = props;

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmployeeBasicInformationSchema),
  });

  const hydrateForm = () => {
    setValue<"email">("email", data?.email!);
    setValue<"jobId">("jobId", data?.jobId!);
    setValue<"salary">("salary", data?.salary!);
    setValue<"clientId">("clientId", data?.clientId!);
    setValue<"lastName">("lastName", data?.lastName!);
    setValue<"statusId">("statusId", data?.statusId!);
    setValue<"firstName">("firstName", data?.firstName!);
    setValue<"phoneNumber">("phoneNumber", data?.phoneNumber!);
    setValue<"nationality">("nationality", data?.nationality!);
    setValue<"dateOfBirth">("dateOfBirth", data?.dateOfBirth!);
    setValue<"countryOfBirth">("countryOfBirth", data?.countryOfBirth!);
    setValue<"salaryCurrency">("salaryCurrency", data?.salaryCurrency!);
    setValue<"identificationNumber">("identificationNumber", data?.identificationNumber!);
  };

  const captureData = (data: any) => {
    handleNext();
    onCapture(data);
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      hydrateForm();
    }
  }, []);

  const jobId = watch<"jobId">("jobId");
  const statusId = watch<"statusId">("statusId");
  const clientId = watch<"clientId">("clientId");
  const nationality = watch<"nationality">("nationality");
  const countryOfBirth = watch<"countryOfBirth">("countryOfBirth");
  const salaryCurrency = watch<"salaryCurrency">("salaryCurrency");

  return (
    <TransitionWrapper duration={0.2} animation={fadeInRight}>
      <div className="flex items-center space-y-0 space-x-4 mt-5">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1 " htmlFor="firstName">
            FirstName<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("firstName", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.firstName && "border-rose-500"}`}
          />
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="firstName">
            {errors.firstName?.message}
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="lastName">
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
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="lastName">
            {errors.lastName?.message}
          </label>
        </div>
      </div>

      <div className="flex items-center space-y-0 space-x-4 mt-5">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1 " htmlFor="email">
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
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
            Phone Number<span className="text-rose-500">*</span>
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

      <div className="flex items-center space-y-0 space-x-4 mt-5">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1 " htmlFor="identificationNumber">
            TRN/SSN<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("identificationNumber", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.identificationNumber && "border-rose-500"}`}
          />
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="identificationNumber">
            {errors.identificationNumber?.message}
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="dateOfBirth">
            Date of Birth<span className="text-rose-500">*</span>
          </label>

          <Datepicker onDateChange={(e) => setValue("dateOfBirth", e, { shouldValidate: true })} />
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="email">
            {errors.dateOfBirth?.message}
          </label>
        </div>
      </div>
      <div className="flex items-center space-y-0 space-x-4 mt-5">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="clientId">
            Client<span className="text-rose-500">*</span>
          </label>
          <ClientSelect value={clientId} onSelect={(option) => setValue("clientId", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="clientId">
            {errors.clientId?.message}
          </label>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="jobId">
            Job Position<span className="text-rose-500">*</span>
          </label>
          <JobSelect value={jobId} onSelect={(option) => setValue("jobId", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="jobId">
            {errors.jobId?.message}
          </label>
        </div>
      </div>

      <div className="flex items-center space-y-0 space-x-4 mt-5">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="business-id">
            Currency<span className="text-rose-500">*</span>
          </label>
          <CurrencySelect value={salaryCurrency} onSelect={(option) => setValue("salaryCurrency", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="salaryCurrency">
            {errors.salaryCurrency?.message}
          </label>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="salary">
            Salary<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("salary", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.salary && "border-rose-500"}`}
          />
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="salary">
            {errors.salary?.message}
          </label>
        </div>
      </div>

      <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="countryOfBirth">
            Country of Birth<span className="text-rose-500">*</span>
          </label>
          <CountrySelect value={countryOfBirth} onSelect={(option) => setValue("countryOfBirth", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="countryOfBirth">
            {errors.countryOfBirth?.message}
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="nationality">
            Nationality<span className="text-rose-500">*</span>
          </label>
          <CountrySelect value={nationality} onSelect={(option) => setValue("nationality", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="nationality">
            {errors.nationality?.message}
          </label>
        </div>
      </div>

      <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1" htmlFor="statusId">
            Status<span className="text-rose-500">*</span>
          </label>
          <EmployeeStatusSelect value={statusId} onSelect={(option) => setValue("statusId", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="statusId">
            {errors.statusId?.message}
          </label>
        </div>
      </div>
      <Navigator steps={steps} handleSkip={handleSkip} handleBack={handleBack} activeStep={activeStep} handleNext={handleSubmit(captureData)} />
    </TransitionWrapper>
  );
}

function AddressInformationStep(props: StepProps) {
  const { data, steps, activeStep, onCapture, handleBack, handleNext, handleSkip } = props;

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddressSchema),
  });

  const hydrateForm = () => {
    setValue<"city">("city", data?.address.city!);
    setValue<"country">("country", data?.address.country!);
    setValue<"province">("province", data?.address.province!);
    setValue<"postalCode">("postalCode", data?.address.postalCode!);
    setValue<"addressLine1">("addressLine1", data?.address.addressLine1!);
    setValue<"addressLine2">("addressLine2", data?.address.addressLine2!);
  };

  const captureData = (data: any) => {
    handleNext();
    onCapture(data);
  };

  useEffect(() => {
    if (data && data?.address) {
      hydrateForm();
    }
  }, []);

  const countryIso = watch<"country">("country");
  const provinceIso = watch<"country">("country");

  return (
    <TransitionWrapper duration={0.2} animation={fadeInRight}>
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
          <CountrySelect onSelect={(option) => setValue("country", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="city">
            {errors.country?.message}
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="business-id">
            Province<span className="text-rose-500">*</span>
          </label>
          <ProvinceSelect value={provinceIso} countryIso={countryIso} onSelect={(option) => setValue("province", option?.id, { shouldValidate: true })} />

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

      <Navigator steps={steps} handleSkip={handleSkip} handleBack={handleBack} activeStep={activeStep} handleNext={handleSubmit(captureData)} />
    </TransitionWrapper>
  );
}

function IntegrationStep(props: StepProps) {
  const { data, steps, activeStep, onCapture, handleBack, handleNext, handleSkip } = props;

  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const { error, data: integrationResult, isFetching, isError, isSuccess } = useGetPaymentIntegrationsQuery({});

  const captureData = () => {
    handleNext();
    onCapture(data);
  };

  useEffect(() => {
    if (!isError && !isFetching && isSuccess && integrationResult) {
      setIntegrations(integrationResult.data);
    }
  }, [isError, isFetching, isSuccess]);

  return (
    <TransitionWrapper duration={0.2} animation={fadeInRight}>
      <div className="mt-4 mb-4">
        {integrations.map((integration) => (
          <div className="mt-4">
            <IntegrationCard integration={integration} />
          </div>
        ))}
      </div>
      <Navigator steps={steps} handleSkip={handleSkip} handleBack={handleBack} activeStep={activeStep} handleNext={captureData} />
    </TransitionWrapper>
  );
}

function BankingInformationStep(props: StepProps) {
  const { data, steps, activeStep, onCapture, handleBack, handleNext, handleSkip } = props;

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmployeeBankingInformationSchema),
  });
  const captureData = (data: any) => {
    handleNext();
    onCapture(data);
  };

  return (
    <TransitionWrapper duration={0.2} animation={fadeInRight}>
      <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="bankName">
            Bank Name<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("bankName", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.bankName && "border-rose-500"}`}
          />
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="bankName">
            {errors.bankName?.message}
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Account Holder Name<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("accountHolderName", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.accountHolderName && "border-rose-500"}`}
          />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="accountHolderName">
            {errors.accountHolderName?.message}
          </label>
        </div>
      </div>

      <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="accountNumber">
            Account Number<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("accountNumber", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.accountNumber && "border-rose-500"}`}
          />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="accountNumber">
            {errors.accountNumber?.message}
          </label>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="branchCode">
            Branch Code<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("bankName", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.branchCode && "border-rose-500"}`}
          />
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="branchCode">
            {errors.branchCode?.message}
          </label>
        </div>
      </div>

      <FormControlLabel control={<AppCheckbox />} label="Gilad Gray" />

      {/**
       * 
      <div className="md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="accountNumber">
            Account Number<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("accountNumber", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.accountNumber && "border-rose-500"}`}
          />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="accountNumber">
            {errors.accountNumber?.message}
          </label>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="bankName">
            Routing Number<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register("bankName", {
              required: true,
              maxLength: 80,
            })}
            className={`form-input w-full ${errors.routingNumber && "border-rose-500"}`}
          />
          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="routingNumber">
            {errors.routingNumber?.message}
          </label>
        </div>
      </div>
       */}
      <div>
        <div className="w-full mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="currency">
            Currency<span className="text-rose-500">*</span>
          </label>
          <CurrencySelect onSelect={(option) => setValue("currency", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="currency">
            {errors.currency?.message}
          </label>
        </div>
      </div>

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
          <CountrySelect onSelect={(option) => setValue("country", option?.id, { shouldValidate: true })} />

          <label className="block text-sm text-rose-500 mb-1 h-5" htmlFor="city">
            {errors.country?.message}
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="business-id">
            Province<span className="text-rose-500">*</span>
          </label>
          <ProvinceSelect onSelect={(option) => setValue("province", option?.id, { shouldValidate: true })} />

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

      <Navigator steps={steps} handleSkip={handleSkip} handleBack={handleBack} activeStep={activeStep} handleNext={handleSubmit(captureData)} />
    </TransitionWrapper>
  );
}

const Navigator: React.FC<NavigatorProps> = (props: NavigatorProps) => {
  const { steps, activeStep, handleBack, handleNext, handleSkip } = props;

  const optionalSteps: number[] = [2];

  const isStepOptional = (step: number) => {
    return optionalSteps.includes(step);
  };

  return (
    <div className="px-5 py-4">
      <div className="flex flex-wrap justify-end space-x-2">
        <button
          className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        {isStepOptional(activeStep) && (
          <button onClick={handleSkip} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
            Skip
          </button>
        )}
        <button onClick={handleNext} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
