import { EnvVars } from "./interfaces";
import axios from "axios";
import { getEnvironmentVariable } from "./utils";

export const EnvironmentVariables: EnvVars = {
  NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

export const axiosInstance = axios.create({
  baseURL: getEnvironmentVariable("NEXT_PUBLIC_FRONTEND_BASE_URL"),
  timeout: 20000,
  withCredentials: true,
});
