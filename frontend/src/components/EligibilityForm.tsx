import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { checkEligibility } from "../services/api";
import type { EligibilityRequest, EligibilityResponse } from "../types";
import { useToast } from "../hooks/useToast";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, checkboxClassName, inputClassName } from "./ui/form-field";

const schema = z.object({
  age: z.coerce.number().int().min(0).max(120),
  gender: z.enum(["female", "male", "other", "prefer_not_to_say"]),
  occupation: z.string().min(2).max(80),
  income: z.coerce.number().int().min(0).max(100000000),
  state: z.string().min(2).max(80),
  disability_status: z.boolean(),
  category: z.enum(["General", "OBC", "SC", "ST", "EWS"]),
  student_status: z.boolean(),
  farmer_status: z.boolean(),
  employment_status: z.enum(["employed", "self_employed", "unemployed", "student", "retired"]),
  has_pucca_house: z.boolean(),
  rural_resident: z.boolean(),
  has_bank_account: z.boolean(),
});

const defaultValues: EligibilityRequest = {
  age: 38,
  gender: "female",
  occupation: "farmer",
  income: 150000,
  state: "Maharashtra",
  disability_status: false,
  category: "OBC",
  student_status: false,
  farmer_status: true,
  employment_status: "self_employed",
  has_pucca_house: false,
  rural_resident: true,
  has_bank_account: true,
};

interface Props {
  onResult: (result: EligibilityResponse) => void;
}

export function EligibilityForm({ onResult }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EligibilityRequest>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const booleanFields = useMemo(
    () => [
      { name: "student_status", label: "Student" },
      { name: "farmer_status", label: "Farmer" },
      { name: "disability_status", label: "Person with disability" },
      { name: "rural_resident", label: "Rural resident" },
      { name: "has_pucca_house", label: "Owns pucca house" },
      { name: "has_bank_account", label: "Has bank account" },
    ] as const,
    [],
  );

  async function onSubmit(values: EligibilityRequest) {
    setIsSubmitting(true);
    try {
      const result = await checkEligibility(values);
      onResult(result);
      showToast({
        title: "Eligibility checked",
        description: `${result.eligible_schemes.length} matching schemes found.`,
      });
    } catch (error) {
      showToast({
        title: "Eligibility check failed",
        description: error instanceof Error ? error.message : "Please verify the backend is running.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Eligibility Profile</CardTitle>
            <CardDescription>Validated locally before sending to FastAPI.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Age" error={errors.age?.message}>
              <input className={inputClassName} type="number" min={0} max={120} {...register("age")} />
            </Field>
            <Field label="Annual income" error={errors.income?.message}>
              <input className={inputClassName} type="number" min={0} {...register("income")} />
            </Field>
            <Field label="Gender" error={errors.gender?.message}>
              <select className={inputClassName} {...register("gender")}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </Field>
            <Field label="Category" error={errors.category?.message}>
              <select className={inputClassName} {...register("category")}>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </Field>
            <Field label="Occupation" error={errors.occupation?.message}>
              <input className={inputClassName} placeholder="Farmer, student, artisan, vendor" {...register("occupation")} />
            </Field>
            <Field label="State" error={errors.state?.message}>
              <input className={inputClassName} placeholder="Maharashtra" {...register("state")} />
            </Field>
            <Field label="Employment status" error={errors.employment_status?.message}>
              <select className={inputClassName} {...register("employment_status")}>
                <option value="employed">Employed</option>
                <option value="self_employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
              </select>
            </Field>
          </div>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-semibold">Profile flags</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {booleanFields.map((field) => (
                <label key={field.name} className="flex min-h-11 items-center gap-3 rounded-md border bg-background px-3 text-sm">
                  <input type="checkbox" className={checkboxClassName} {...register(field.name)} />
                  <span>{field.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Button type="submit" className="h-11 w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            <span>{isSubmitting ? "Checking" : "Check eligibility"}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
