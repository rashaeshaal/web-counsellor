
export interface Counsellor {
  id?: number;
  phone_number: string;
  email: string | null;
  profile: {
    user_role: string;
    phone_number: string;
    name: string | null;
    email: string | null;
    age: number | null;
    gender: string | null;
    qualification: string | null;
    experience: number | null;
    google_pay_number: string | null;
    account_number: string | null;
    ifsc_code: string | null;
    is_approved: boolean;
    is_active: boolean;
    profile_photo: string | null;
  };
  firebase_uid?: string | null;
}