import { ApiResponse } from "./interfaces";
import {
  ENVIRONMENT_VARIABLES,
  ROLENAME,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_UNAUTHORIZED,
} from "./constants";
import { EnvVars } from "./interfaces";

// In the 'constants' file exist a dictionary containing the environment variables
// but they can be string or null. This function throws error if the requested
// environment variable is null or return its value
export const getEnvironmentVariable = (varName: keyof EnvVars): string => {
  const env_var = ENVIRONMENT_VARIABLES[varName];

  if (!env_var) {
    throw new Error(`Error, the environment variable "${varName} was not found
      in the environment file."`);
  }

  return env_var;
};

// This function manages what happens when the api response is an error
// returns an string with a message for the client
export const manageRequestErrors = (
  apiResponse: ApiResponse<unknown>,
  errorMessagesToShow: { [key: string]: string }
): string | undefined => {
  const UNAUTHORIZED_CLIENT_MESSAGE =
    "No tienes permisos suficientes para realizar esta accion.";

  if (apiResponse.status_code === STATUS_CODE_UNAUTHORIZED) {
    return UNAUTHORIZED_CLIENT_MESSAGE;
  }

  // If error was caused by a bad request
  if (apiResponse.status_code === STATUS_CODE_BAD_REQUEST) {
    const badRequestMessageToClient: string | undefined =
      errorMessagesToShow[
        apiResponse.message as keyof typeof errorMessagesToShow
      ];

    return badRequestMessageToClient;
  }
};

// Receives a string representing a date in format yyyy-mm-ddT00:00:00.000Z
// and returns the same string but in format yyyy-mm-dd
export function normalizeDate(date: string) {
  return date.split("T")[0];
}
