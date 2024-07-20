import { EnvironmentVariables, ROLENAME } from "./constants";
import { EnvVars, User } from "./interfaces";
import { USERNAME } from "./constants";

// In the 'constants' file exist a dictionary containing the environment variables
// but they can be string or null. This function throws error if the requested
// environment variable is null or return its value
export const getEnvironmentVariable = (varName: keyof EnvVars): string => {
  const env_var = EnvironmentVariables[varName];

  if (!env_var) {
    throw new Error(`Error, the environment variable "${varName} was not found
      in the environment file."`);
  }

  return env_var;
};
