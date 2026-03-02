/**
 * Input validation for the medical license search form.
 *
 * The API accepts:
 *   License_Number  — state-issued medical license number (required)
 *   State           — full state name, e.g. "Georgia" (required)
 */

export interface SearchFormValues {
  licenseNumber?: string;
  state?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  normalised?: {
    licenseNumber: string;
    state: string;
  };
}

/** Map from lowercase input → canonical state name the API expects */
const VALID_STATE_NAMES = new Map<string, string>([
  ["alabama", "Alabama"], ["alaska", "Alaska"], ["arizona", "Arizona"],
  ["arkansas", "Arkansas"], ["california", "California"], ["colorado", "Colorado"],
  ["connecticut", "Connecticut"], ["delaware", "Delaware"], ["florida", "Florida"],
  ["georgia", "Georgia"], ["hawaii", "Hawaii"], ["idaho", "Idaho"],
  ["illinois", "Illinois"], ["indiana", "Indiana"], ["iowa", "Iowa"],
  ["kansas", "Kansas"], ["kentucky", "Kentucky"], ["louisiana", "Louisiana"],
  ["maine", "Maine"], ["maryland", "Maryland"], ["massachusetts", "Massachusetts"],
  ["michigan", "Michigan"], ["minnesota", "Minnesota"], ["mississippi", "Mississippi"],
  ["missouri", "Missouri"], ["montana", "Montana"], ["nebraska", "Nebraska"],
  ["nevada", "Nevada"], ["new hampshire", "New Hampshire"], ["new jersey", "New Jersey"],
  ["new mexico", "New Mexico"], ["new york", "New York"],
  ["north carolina", "North Carolina"], ["north dakota", "North Dakota"],
  ["ohio", "Ohio"], ["oklahoma", "Oklahoma"], ["oregon", "Oregon"],
  ["pennsylvania", "Pennsylvania"], ["rhode island", "Rhode Island"],
  ["south carolina", "South Carolina"], ["south dakota", "South Dakota"],
  ["tennessee", "Tennessee"], ["texas", "Texas"], ["utah", "Utah"],
  ["vermont", "Vermont"], ["virginia", "Virginia"], ["washington", "Washington"],
  ["west virginia", "West Virginia"], ["wisconsin", "Wisconsin"],
  ["wyoming", "Wyoming"], ["district of columbia", "District of Columbia"],
  ["washington dc", "District of Columbia"], ["washington d.c.", "District of Columbia"],
]);

/** Two-letter abbreviation → full state name */
const ABBR_MAP: Record<string, string> = {
  al:"Alabama", ak:"Alaska", az:"Arizona", ar:"Arkansas",
  ca:"California", co:"Colorado", ct:"Connecticut", de:"Delaware",
  fl:"Florida", ga:"Georgia", hi:"Hawaii", id:"Idaho",
  il:"Illinois", in:"Indiana", ia:"Iowa", ks:"Kansas",
  ky:"Kentucky", la:"Louisiana", me:"Maine", md:"Maryland",
  ma:"Massachusetts", mi:"Michigan", mn:"Minnesota", ms:"Mississippi",
  mo:"Missouri", mt:"Montana", ne:"Nebraska", nv:"Nevada",
  nh:"New Hampshire", nj:"New Jersey", nm:"New Mexico", ny:"New York",
  nc:"North Carolina", nd:"North Dakota", oh:"Ohio", ok:"Oklahoma",
  or:"Oregon", pa:"Pennsylvania", ri:"Rhode Island", sc:"South Carolina",
  sd:"South Dakota", tn:"Tennessee", tx:"Texas", ut:"Utah",
  vt:"Vermont", va:"Virginia", wa:"Washington", wv:"West Virginia",
  wi:"Wisconsin", wy:"Wyoming", dc:"District of Columbia",
};

/**
 * Resolve any state input (full name, abbreviation, or slug) to the canonical
 * full state name the API expects, e.g. "Georgia".
 */
export function resolveStateName(input: string): string | null {
  if (!input) return null;
  const lower = input.trim().toLowerCase();
  if (VALID_STATE_NAMES.has(lower)) return VALID_STATE_NAMES.get(lower)!;
  if (ABBR_MAP[lower]) return ABBR_MAP[lower];
  return null;
}

export function validateSearchForm(values: SearchFormValues): ValidationResult {
  const errors: Record<string, string> = {};
  const licenseNumber = values.licenseNumber?.trim() ?? "";
  const stateInput    = values.state?.trim() ?? "";

  if (!licenseNumber) {
    errors.licenseNumber = "Please enter a medical license number.";
  } else if (licenseNumber.length < 2) {
    errors.licenseNumber = "License number appears too short.";
  } else if (licenseNumber.length > 50) {
    errors.licenseNumber = "License number appears too long.";
  }

  if (!stateInput) {
    errors.state = "Please select a state.";
  } else if (!resolveStateName(stateInput)) {
    errors.state = "Please select a valid US state.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    normalised: {
      licenseNumber,
      state: resolveStateName(stateInput)!,
    },
  };
}

export function sanitiseQueryParam(
  value: string | null | undefined,
  maxLength = 100
): string | null {
  if (!value) return null;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.length > 0 ? trimmed : null;
}

export function isValidLicenseNumber(value: string): boolean {
  const t = value.trim();
  return t.length >= 2 && t.length <= 50;
}
