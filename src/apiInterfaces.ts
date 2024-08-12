export interface ApiRole {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
  created_at: string;
  updated_at: string;
  role: ApiRole;
}
