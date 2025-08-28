export interface Problem {
  id?: number;
  title: string;
  image?: string | File;
  description: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number; // Reference to UserProfile ID
}