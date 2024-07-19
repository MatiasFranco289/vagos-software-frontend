import { EnvironmentVariables } from "./constants";
import { EnvVars } from "./interfaces";

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
