export type Gender = "female" | "male" | "other" | "prefer_not_to_say";
export type Category = "General" | "OBC" | "SC" | "ST" | "EWS";
export type EmploymentStatus = "employed" | "self_employed" | "unemployed" | "student" | "retired";

export interface EligibilityRequest {
  age: number;
  gender: Gender;
  occupation: string;
  income: number;
  state: string;
  disability_status: boolean;
  category: Category;
  student_status: boolean;
  farmer_status: boolean;
  employment_status: EmploymentStatus;
  has_pucca_house: boolean;
  rural_resident: boolean;
  has_bank_account: boolean;
}

export interface Scheme {
  scheme_name: string;
  category: string;
  state: string;
  eligibility: string[];
  income_limit: number;
  benefit: string;
  documents: string[];
  application_process: string;
  official_website: string;
  keywords: string[];
  summary: string;
}

export interface SchemeDecision {
  scheme: Scheme;
  reasons: string[];
}

export interface EligibilityResponse {
  eligible_schemes: SchemeDecision[];
  ineligible_schemes: SchemeDecision[];
  profile_summary: Record<string, string | number | boolean>;
}
