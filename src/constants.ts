import { EnvVars } from "./interfaces";

export const ENVIRONMENT_VARIABLES: EnvVars = {
  NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

export const USERNAME = "username";
export const ROLENAME = "rolename";
export const ID = "id";

export const ROLENAME_ADMIN = "ADMIN";
export const ROLENAME_USER = "USER";

export const DEFAULT_API_ERROR_MESSAGE =
  "Something went wrong while trying to reach the endpoint";
export const DEFAULT_API_ERROR_CLIENT_MESSAGE =
  "Ha ocurrido un error inesperado. Por favor, intentalo nuevamente mas tarde.";

export const STATUS_CODE_OK = 200;
export const STATUS_CODE_CREATED = 201;
export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

export const GET_PROJECTS = "/api/projects";
export const GET_PROJECT_DETAILS = "/api/projects/";
export const GET_PROJECT_STATES_API_URL = "/api/projects/status";
export const GET_PROJECT_TAGS_API_URL = "/api/projects/tags";
export const GET_ALL_RESOURCE_TYPES_API_URL = "/api/admin/resources/types";

export const POST_PROJECT_RESOURCE_API_URL = "/api/admin/projects/resources";
export const POST_PROJECT_API_URL = "/api/admin/projects";
export const POST_BLOG_API_URL = "/api/admin/blogs";
export const POST_RESOURCE_TYPE_API_URL = "/api/admin/resources/types";

export const PUT_RESOURCE_TYPE_API_URL = "/api/admin/resources/types";

export const PAGES_URLS = {
  home: "/",
  projects: "/projects",
  blogs: "/blogs",
  about: "/about-us",
  profile: "/profile",
  login: "/login",
};
