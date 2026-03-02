import type { Metadata } from "next";
import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { searchByLicenseNumber, ApiError, type LicenseRecord } from "@/lib/apiClient";
import { isValidLicenseNumber, resolveStateName } from "@/lib/validation";

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const license = typeof params.licenseNumber === "string" ? params.licenseNumber : "";
  const state   = typeof params.state === "string" ? params.state : "";

  const title = license
    ? `License Lookup – ${license}${state ? ` (${state})` : ""}`
    : "Medical License Search Results";

  return {
    title,
    description: "View medical license status for a US healthcare provider. Data from public state board records.",
    robots: { index: false, follow: false },
  };
}

async function fetchLicenseRecord(
  licenseNumber: string,
  state: string
): Promise<{ record: LicenseRecord | null; error: string | null }> {
  try {
    const record = await searchByLicenseNumber({ licenseNumber, state });
    return { record, error: null };
  } catch (err) {
    if (err instanceof ApiError) {
      return { record: null, error: err.message };
    }
    return { record: null, error: "Unable to reach the license data service. Please try again." };
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params        = await searchParams;
  const licenseNumber = typeof params.licenseNumber === "string" ? params.licenseNumber.trim() : "";
  const stateInput    = typeof params.state === "string" ? params.state.trim() : "";

  // Resolve state input to full name (e.g. "GA" → "Georgia")
  const resolvedState = resolveStateName(stateInput) ?? stateInput;

  const canSearch = isValidLicenseNumber(licenseNumber) && !!resolvedState;

  let record: LicenseRecord | null = null;
  let error: string | null = null;

  if (canSearch) {
    ({ record, error } = await fetchLicenseRecord(licenseNumber, resolvedState));
  } else if (licenseNumber && !canSearch) {
    error = !resolvedState
      ? "Please select a valid state."
      : "Please enter a valid license number.";
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search Results", href: "/search" },
  ];

  return (
    <div className="container-default py-8">
      <div className="mb-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>

      <h1 className="mb-2" style={{ fontSize: "32px", letterSpacing: "-1px" }}>
        Medical License Search Results
      </h1>
      <p className="mb-8" style={{ color: "var(--gray-color)", fontSize: "14px" }}>
        Results are sourced from publicly available state medical board data.
        Always verify with the official board before making credentialing decisions.
      </p>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {/* Compact search form for refinement */}
          <div className="bg-white border p-5" style={{ borderColor: "var(--strock-color)", borderRadius: "var(--radius)" }}>
            <h2 className="mb-4" style={{ fontSize: "16px", fontWeight: 600, color: "var(--dark-color)", letterSpacing: "-0.3px" }}>Refine your search</h2>
            <SearchForm
              defaultValues={{ licenseNumber, state: stateInput }}
              compact
            />
          </div>

          {/* Results */}
          {canSearch || error ? (
            <SearchResults
              result={record}
              error={error}
              licenseNumber={licenseNumber}
              state={resolvedState}
            />
          ) : (
            <div className="bg-white border p-8 text-center" style={{ borderColor: "var(--strock-color)", borderRadius: "var(--radius)", color: "var(--gray-color)" }}>
              <p className="font-medium">Enter a license number and select a state to search.</p>
            </div>
          )}
        </div>

        {/* Right rail ad */}
        <aside aria-label="Advertisements" className="hidden lg:block">
          <div className="sticky top-24">
            <AdSlot position="right-rail" />
          </div>
        </aside>
      </div>
    </div>
  );
}
