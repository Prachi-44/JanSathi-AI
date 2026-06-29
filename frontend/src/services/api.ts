import axios from "axios";

import type { EligibilityRequest, EligibilityResponse, Scheme } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function checkEligibility(payload: EligibilityRequest): Promise<EligibilityResponse> {
  const response = await api.post<EligibilityResponse>("/eligibility/check", payload);
  return response.data;
}

export async function listSchemes(): Promise<Scheme[]> {
  const response = await api.get<Scheme[]>("/schemes");
  return response.data;
}
