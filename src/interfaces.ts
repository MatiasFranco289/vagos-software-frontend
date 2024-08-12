// This interface represents all the variables in the .env file
export interface EnvVars {
  NEXT_PUBLIC_FRONTEND_BASE_URL: string | undefined;
  NEXT_PUBLIC_BACKEND_BASE_URL: string | undefined;
}

// This interface represents the format used for the api to response
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: Array<T>;
}

// This interface defines identity 'Rol' retrieved by API
/* export interface Role {
  id: number;
  rolename: string;
} */

// This interface represents the identity 'User' retrivied by API
/* export interface User {
  id: number;
  username: string;
  role: Role;
} */

// This interface represents the information about user saved in the client side
export interface UserInfo {
  username: string;
  rolename: string;
}

// This interface defines the different urls for all the pages
export interface PagesUrl {
  home: string;
  projects: string;
  blogs: string;
  about: string;
  profile: string;
  login: string;
}

export interface BlogInfo {
  title: string;
  relatedProjectId: string;
  body: string;
}
