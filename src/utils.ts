"use client";
import {
  ENVIRONMENT_VARIABLES,
  ROLE_ADMIN,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "./constants";
import { ApiResponse, EnvVars } from "./interfaces";
import axiosInstance from "./axios";
import { ROLENAME } from "./constants";
import { AxiosResponse } from "axios";

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

// This function manages api requests
// Manage errors, showing more info if you are ADMIN
// If everything is okay it returns the endpoint response
export const apiRequestHandler = async (
  url: string,
  method: "get" | "post" | "put" | "delete",
  expectedHttpCode: number
) => {
  const defaultErrorMessage = `Something went wrong while trying to reach the endpoint.
        If you are an admin, please check the console to get more info.`;

  const defaultResponse = {
    data: {
      statusCode: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: "Something went wrong, check the console to get more info.",
      data: [],
    },
  };

  const rolename = localStorage.getItem(ROLENAME);

  try {
    const response = await axiosInstance[method](url);

    if (response.status === expectedHttpCode) {
      return response;
    }
    // If the http code in the response is not the expected
    else {
      console.error(defaultErrorMessage);

      // This is only showed to admins
      if (rolename === ROLE_ADMIN) {
        console.error(`It was expected ${url} to have a http code ${expectedHttpCode} but instead
          the code in the response is ${response.status}`);

        console.log(response);
      }
    }
  } catch (err) {
    console.error(defaultErrorMessage);

    // The error is showed only if u are admin
    if (rolename === ROLE_ADMIN) {
      console.error(
        `The following error has ocurred while trying to reach the endpoint ${url}`
      );
      console.error(err);
    }
  }

  return defaultResponse;
};
