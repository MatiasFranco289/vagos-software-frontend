import { EnvVars } from "./interfaces";

export const ENVIRONMENT_VARIABLES: EnvVars = {
  NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

export const USERNAME = "username";
export const ROLENAME = "rolename";

export const ROLENAME_ADMIN = "ADMIN";
export const ROLENAME_USER = "USER";

export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_UNAUTHORIZED = 401;

export const PAGES_URLS = {
  home: "/",
  projects: "/projects/1",
  blogs: "/blogs",
  about: "/about-us",
  profile: "/profile",
  login: "/login",
};
