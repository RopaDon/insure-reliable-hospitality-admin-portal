import * as yup from "yup";

export const AuthenticationSchema = yup.object().shape({
  username: yup.string().max(255).required("Username is required"),
  password: yup.string().required("Password is required").min(8, "Must be at least 8 characters"),
});

export const ClientSchema = yup.object().shape({
  phoneNumber: yup.string().nullable(),
  description: yup.string().nullable(),
  representative: yup.string().nullable(),
  clientStatusId: yup.number().required(),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  province: yup.string().required("Province is required"),
  industry: yup.number().required("Industry is required"),
  name: yup.string().max(255).required("Name is required"),
  email: yup.string().email().required("Email is required"),
  postalCode: yup.string().required("Postal Code is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string().required("Address Line 2 is required"),
});

export const WaitlistSchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  industryId: yup.number().required("Industry is required"),
  firstName: yup.string().required("First Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  jobExperienceLevelId: yup.number().required("Job Experience is required"),
});

export const EmployeeBasicInformationSchema = yup.object().shape({
  jobId: yup.number().required("Job is required"),
  clientId: yup.number().required("Client is required"),
  salary: yup.number().required("Salary is required"),
  statusId: yup.number().required("Status is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  firstName: yup.string().required("First Name is required"),
  salaryCurrency: yup.string().required("Currency is required"),
  nationality: yup.string().required("Nationality is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  countryOfBirth: yup.string().nullable("Country of Birth is required"),
  identificationNumber: yup.string().required("Identification Number is required"),
});

export const AddressSchema = yup.object().shape({
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  province: yup.string().required("Province is required"),
  postalCode: yup.string().required("Postal Code is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string().required("Address Line 2 is required"),
});

export const EmployeeBankingInformationSchema = yup.object().shape({
  bankName: yup.string().nullable(),
  swiftCode: yup.string().nullable(),
  branchCode: yup.string().nullable(),
  transferType: yup.string().nullable(),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  province: yup.string().required("Province is required"),
  currency: yup.string().required("Currency is required"),
  postalCode: yup.string().required("Postal Code is required"),
  accountType: yup.string().required("Account Type is required"),
  addressLine2: yup.string().required("Address Line 2 is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  accountNumber: yup.number().required("Account Number is required"),
  routingNumber: yup.string().required("Routing Number is required"),
  accountHolderName: yup.string().required("Account Holder Name is required"),
});
