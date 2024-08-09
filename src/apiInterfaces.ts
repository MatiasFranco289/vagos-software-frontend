// This file is for define the interfaces of the different api responses

export interface ApiProjectTag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiProjectState {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
