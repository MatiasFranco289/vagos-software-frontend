import { EnvVars } from "./interfaces";

export const ENVIRONMENT_VARIABLES: EnvVars = {
  NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

export const USERNAME = "username";
export const ROLENAME = "rolename";
export const ROLE_ADMIN: string = "ADMIN";

export const STATUS_CODE_OK = 200;
export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_UNAUTHORIZED = 403;
export const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

export const PAGES_URLS = {
  home: "/",
  projects: "/projects/1",
  blogs: "/blogs",
  about: "/about-us",
  profile: "/profile",
  login: "/login",
};

export const GET_PROJECT_TAGS_API_URL = "/api/project-tag";
export const GET_PROJECT_STATES_API_URL = "/api/project-state";
