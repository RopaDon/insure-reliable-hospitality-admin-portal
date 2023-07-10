export enum Environments {
  LOCAL = "test",
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}
export enum ApiMethods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

export enum AdminRole {
  Admin = "Admin",
}
export enum BaseEndpoints {
  Job = "jobs",
  Auth = "auth",
  Staff = "staff",
  Clients = "clients",
  Service = "service",
  Finance = "finances",
  Waitlist = "waitlist",
  Document = "documents",
  Employee = "employees",
  Industry = "industries",
  Integrations = "integrations",
}

export enum FormState {
  Creation = "Create",
  Update = "Update",
}

export enum EmployeeCreationSteps {
  Step1 = "Basic information",
  Step2 = "Address details",
  Step3 = "Integrations",
  Step4 = "Banking Details",
}
