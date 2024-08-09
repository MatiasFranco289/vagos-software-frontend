import axios from "axios";
import { USERNAME, ROLENAME, STATUS_CODE_UNAUTHORIZED } from "./constants";

const INVALID_TOKEN_MESSAGE = "Invalid token";

const baseURL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

if (!baseURL) {
  throw new Error(`Error, the environment variable 'NEXT_PUBLIC_FRONTEND_BASE_URL' was not found
    in the environment file."`);
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  withCredentials: true,
});

// If i get a 403 error and it is because token has expired i need to delete
// the user credentials saved in localStorage.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode: number = error.response.status;

    if (statusCode === STATUS_CODE_UNAUTHORIZED) {
      const rejectionCause = error.response.data.message;

      if (rejectionCause === INVALID_TOKEN_MESSAGE) {
        localStorage.removeItem(USERNAME);
        localStorage.removeItem(ROLENAME);
        console.error(
          "The authentication token is invalid, has expired or is empty"
        );
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
