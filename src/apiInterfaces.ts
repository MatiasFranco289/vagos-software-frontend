// All of this interfaces are representations of api responses for different entities
// however in many cases some extra keys are added via associations
// you are free to extend from this interfaces if you need to add these extra keys
export interface ApiUserRole {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiProjectTag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiProjectStatus {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResourceType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResource {
  id: number;
  url: string;
  type_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiProject {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  start_date: string;
  end_date?: string;
  expected_end_date?: string;
  status_id: number;
  repository_url: string;
  tags_id: Array<number>;
  creator_id: number;
  created_at: string;
  updated_at: string;
  tags?: Array<ApiProjectTag>;
  status?: ApiProjectStatus;
}

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
  status_id: number;
  created_at: string;
  updated_at: string;
}
