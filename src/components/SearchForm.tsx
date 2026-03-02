"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { US_STATES } from "@/lib/states";
import { isValidLicenseNumber } from "@/lib/validation";

interface SearchFormProps {
  defaultValues?: {
    licenseNumber?: string;
    state?: string;
  };
  compact?: boolean;
}

export function SearchForm({ defaultValues = {}, compact = false }: SearchFormProps) {
  const router = useRouter();

  const [licenseNumber, setLicenseNumber] = useState(defaultValues.licenseNumber ?? "");
  const [state, setState] = useState(defaultValues.state ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!licenseNumber.trim()) {
      newErrors.licenseNumber = "Please enter a medical license number.";
    } else if (!isValidLicenseNumber(licenseNumber)) {
      newErrors.licenseNumber = "License number appears invalid.";
    }

    if (!state) {
      newErrors.state = "Please select a state.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [licenseNumber, state]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setIsSubmitting(true);
      const params = new URLSearchParams();
      params.set("licenseNumber", licenseNumber.trim());
      params.set("state", state);
      router.push(`/search?${params.toString()}`);
    },
    [licenseNumber, state, validate, router]
  );

  const inputBase =
    "block w-full border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition text-sm";
  const errorCls = "border-red-400 bg-red-50 focus:ring-red-400";
  const normalCls = "border-[#e4e4e4] bg-white focus:ring-[#ff5700] focus:border-[#ff5700]";
  const labelCls = "block text-sm font-medium text-[#1a1a1a] mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Medical license search form"
      className={compact ? "" : "bg-white border border-[#e4e4e4] p-6 sm:p-8"}
      style={{ borderRadius: "var(--radius)" }}
    >
      <div className={`grid gap-4 ${compact ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>

        {/* License Number */}
        <div>
          <label htmlFor="licenseNumber" className={labelCls}>
            Medical License Number{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="licenseNumber"
            type="text"
            value={licenseNumber}
            onChange={(e) => {
              setLicenseNumber(e.target.value);
              if (errors.licenseNumber) setErrors((p) => ({ ...p, licenseNumber: "" }));
            }}
            placeholder="e.g. 43477"
            aria-required="true"
            aria-describedby={errors.licenseNumber ? "license-error" : "license-hint"}
            className={`${inputBase} ${errors.licenseNumber ? errorCls : normalCls}`}
            style={{ borderRadius: "var(--radius)" }}
            autoComplete="off"
          />
          {errors.licenseNumber ? (
            <p id="license-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.licenseNumber}
            </p>
          ) : (
            <p id="license-hint" className="mt-1 text-xs text-gray-400">
              The state-issued medical license number for the provider.
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className={labelCls}>
            State{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              if (errors.state) setErrors((p) => ({ ...p, state: "" }));
            }}
            aria-required="true"
            aria-describedby={errors.state ? "state-error" : undefined}
            className={`${inputBase} ${errors.state ? errorCls : normalCls}`}
            style={{ borderRadius: "var(--radius)" }}
          >
            <option value="">Select a state…</option>
            {US_STATES.map((s) => (
              <option key={s.abbr} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p id="state-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.state}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="hero-button disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "#343434",
            color: "white",
            padding: "14px 28px",
            fontFamily: "var(--heading-font)",
            fontWeight: 500,
            fontSize: "16px",
            gap: "8px",
            display: "inline-flex",
            alignItems: "center",
            minWidth: "150px",
            justifyContent: "center",
          }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              Search
            </>
          )}
        </button>
      </div>
    </form>
  );
}
