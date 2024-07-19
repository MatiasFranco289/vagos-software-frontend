import { EnvVars } from "./interfaces";

export const EnvironmentVariables: EnvVars = {
  NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

export const USERNAME = "username";
export const ROLENAME = "rolename";
export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_UNAUTHORIZED = 403;
