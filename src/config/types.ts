import { AdminRole } from "./enums/enums";

export interface ApiResult<T> {
  data: T;
  path: string;
  success: boolean;
  timestamp: string;
  errors: ApiError[];
  statusCode: number;
}

export type NavigatorProps = {
  steps: any;
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSkip: () => void;
};

export type StepProps = {
  steps: any;
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSkip: () => void;
  data: CreateEmployeeDTO | null;
  onCapture: (data: any) => void;
};

export interface Query {
  limit: number;
  page: number;
  searchTerm?: string | null;
}

export interface DropdownOption {
  id: any;
  value: any;
}

export interface Pagination<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface ApiResult<T> {
  data: T;
  path: string;
  success: boolean;
  timestamp: string;
  errors: ApiError[];
  statusCode: number;
}

export interface ApiError {
  type: string;
  message: string;
}

export interface Auth {
  user: Admin;
  token: Token;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface Admin {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  role: Role;

  username: string;

  phoneNumber: string;

  profilePic: string | null;

  permissions: Permission[];

  lastLogin: Date | null;
}

export interface Role {
  id: number;
  name: string;
}

export interface AdminPermission {
  permission: Permission;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface BankingInformation {
  id: number;

  firstName: string;

  lastName: string;

  currency: string;

  accountNumber: string;

  routingNumber?: string;

  transferType: string;

  swiftCode?: string;

  bankName?: string;

  accountType?: string;

  accountHolderName: string;

  address: Address;
}

export interface Employee {
  id: number;

  firstName: string;

  lastName: string;

  email?: string;

  dateOfBirth?: string;

  dollarRate: string;

  wiseRecipientID: string;

  displayPhoto: string;

  phoneNumber: string;

  bankingInformation: BankingInformation;
}

export interface Address {
  id: number;

  addressLine1: string;

  addressLine2?: string;

  city: string;

  country: string;

  province: string;

  postalCode: string;
}

export interface Client {
  id: number;

  name: string;

  email: string;

  description: string;

  displayPhoto: string;

  representative: string;

  industryId: number;

  statusId: number;

  phoneNumber: string;

  address: Address;

  status: Status;

  employeeCatalouge: BusinessEmployee[];
}

export interface Waitlist {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  country: string;

  phoneNumber: string;

  industry: Industry;

  jobExperienceLevel: JobExperienceLevel;

  createdOn: string;
}

export interface JobExperienceLevel {
  id: number;
  name: string;
  description: string;
}

export interface Status {
  id: number;
  name: string;
  description: string;
}

export interface Status {
  id: number;
  name: string;
  description: string;
}

export interface BusinessEmployee {
  employee: Employee;
}

export interface Job {
  id: number;
  name: string;
  createdOn: string;
  createdBy?: string;
  description: string;
}

export interface Document {
  id: number;
  name: string;
  file: string;
  type: string;
  description: string;
  size: number;
  createdOn: string;
  createdBy?: string;
}

export interface Industry {
  id: number;
  name: string;
  description: string;
}

export interface Country {
  name: string;
  code: string;
}

export interface Province {
  name: string;
  code: string;
  country: string;
}

export interface ActionResult {
  action: string;
}

export interface OptionSets {
  id: number;

  name: string;

  description: string;
}

export interface CreateEmployeeDTO {
  email?: string;

  firstName: string;

  lastName: string;

  phoneNumber: string;

  dateOfBirth: string;

  statusId: number;

  nationality: string;

  countryOfBirth: string;

  salaryCurrency: string;

  identificationNumber: string;

  displayPhoto?: string;

  clientId: number;

  jobId: number;

  salary: number;

  address: Address;

  bankingInformation: BankingInformation;
}

export interface Currency {
  id: number;

  code: string;

  name: string;

  symbol: string;

  description: string;

  createdOn: string;
}

export interface Integration {
  platformName: number;

  accountId: string;

  logo: string;

  expiryDate?: string;

  integrationTypeId: string;

  type: string;

  isActive: string;

  description: string;

  integrationType: IntergrationStatus;
}

interface IntergrationStatus {
  id: string;
  name: string;
}
