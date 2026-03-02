"use client";

import Link from "next/link";
import { LicenseRecord } from "@/lib/apiClient";
import { AdSlot } from "./AdSlot";
import { US_STATES } from "@/lib/states";

interface SearchResultsProps {
  result: LicenseRecord | null;
  error: string | null;
  licenseNumber: string;
  state: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Active:    { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  Inactive:  { bg: "#f9fafb", text: "#6b7280", border: "#e5e7eb" },
  Expired:   { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  Probation: { bg: "#fefce8", text: "#a16207", border: "#fde68a" },
  Suspended: { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  Revoked:   { bg: "#fef2f2", text: "#7f1d1d", border: "#fca5a5" },
  Unknown:   { bg: "#f9fafb", text: "#6b7280", border: "#e5e7eb" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.Unknown;
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-sm font-semibold border"
      style={{ background: s.bg, color: s.text, borderColor: s.border, borderRadius: "var(--radius)" }}
    >
      {status}
    </span>
  );
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-[#e4e4e4] last:border-0">
      <dt className="text-sm font-medium text-gray-400 sm:w-48 shrink-0">{label}</dt>
      <dd className="text-sm text-[#1a1a1a]">{value ?? "—"}</dd>
    </div>
  );
}

function ResultCard({ result, licenseNumber, state }: {
  result: LicenseRecord;
  licenseNumber: string;
  state: string;
}) {
  const stateInfo = US_STATES.find((s) => s.name.toLowerCase() === state.toLowerCase());
  const verifiedDate = new Date(result.verifiedAt).toLocaleString("en-US", {
    dateStyle: "medium", timeStyle: "short", timeZone: "UTC",
  });

  return (
    <article aria-label="License record" className="bg-white border border-[#e4e4e4] overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
      {/* Header */}
      <div
        className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#e4e4e4]"
        style={{ backgroundColor: "var(--dark-color)" }}
      >
        <div>
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--heading-font)", letterSpacing: "-0.3px" }}>
            {result.providerName ?? "License Record Found"}
          </h2>
          <p className="text-gray-400 text-sm">License #{licenseNumber} · {state}</p>
        </div>
        <StatusBadge status={result.status} />
      </div>

      {/* Body */}
      <div className="px-6 py-4">
        <dl>
          {result.providerName && (
            <InfoRow label="Provider Name" value={result.providerName} />
          )}
          <InfoRow label="License Number"  value={licenseNumber} />
          <InfoRow label="State"           value={state} />
          {result.licenseType && (
            <InfoRow label="License Type"  value={result.licenseType} />
          )}
          <InfoRow label="Status"          value={<StatusBadge status={result.status} />} />
          <InfoRow label="Issue Date"      value={formatDate(result.issueDate)} />
          <InfoRow label="Expiration Date" value={formatDate(result.expirationDate)} />
          <InfoRow label="Data Verified"   value={verifiedDate} />
          {stateInfo && (
            <InfoRow
              label="Verify with Board"
              value={
                <a
                  href={stateInfo.boardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:no-underline"
                  style={{ color: "var(--primary-color)" }}
                >
                  {stateInfo.boardName} ↗
                </a>
              }
            />
          )}
        </dl>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-200 px-6 py-4 text-xs text-amber-800">
        <strong>Important:</strong> This data is aggregated from public sources and may not
        reflect the most current status.{" "}
        {stateInfo ? (
          <>Always confirm directly with the{" "}
            <a href={stateInfo.boardUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">
              {stateInfo.boardName}
            </a>{" "}
            before making credentialing or hiring decisions.
          </>
        ) : (
          <>Always confirm with the appropriate state medical board.</>
        )}
      </div>
    </article>
  );
}

function NoResults({ licenseNumber, state }: { licenseNumber: string; state: string }) {
  const stateInfo = US_STATES.find((s) => s.name.toLowerCase() === state.toLowerCase());
  return (
    <div className="bg-white border border-[#e4e4e4] p-8 text-center" style={{ borderRadius: "var(--radius)" }}>
      <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2" style={{ fontFamily: "var(--heading-font)", letterSpacing: "-0.3px" }}>
        No Record Found
      </h2>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
        No license record was found for license number <strong className="font-mono">{licenseNumber}</strong> in <strong>{state}</strong>.
      </p>
      {stateInfo && (
        <p className="text-sm text-gray-500 mb-4">
          Try searching directly at the{" "}
          <a href={stateInfo.boardUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium" style={{ color: "var(--primary-color)" }}>
            {stateInfo.boardName}
          </a>
          .
        </p>
      )}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div role="alert" className="bg-red-50 border border-red-200 p-6 text-red-800" style={{ borderRadius: "var(--radius)" }}>
      <p className="font-semibold mb-1">Search Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}

function ResultFaqs() {
  const faqs = [
    { q: "What does an 'Active' status mean?", a: "An Active status means the provider's license is current and in good standing. It has not expired, been suspended, or been revoked." },
    { q: "What should I do if the information seems incorrect?", a: "Our data is aggregated from public sources and may lag behind official records. Verify directly with the state medical board. You can also submit a correction request on our Removal page." },
    { q: "How often is this data updated?", a: "Records are refreshed regularly from official public data sources. There may be a delay between a board action and when it appears here. Use the 'Data Verified' timestamp as a guide." },
    { q: "Is this site affiliated with any state medical board?", a: "No. Medical License Search is an independent aggregator of public data. We are not affiliated with, endorsed by, or operated by any state medical board or government agency." },
  ];

  return (
    <section aria-labelledby="result-faqs-heading" className="mt-8">
      <h2 id="result-faqs-heading" className="text-xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--heading-font)", letterSpacing: "-0.5px" }}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-white border border-[#e4e4e4] overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-[#1a1a1a] hover:bg-[whitesmoke] transition-colors list-none">
              {faq.q}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </summary>
            <p className="px-5 pb-4 pt-1 text-sm text-gray-500">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SearchResults({ result, error, licenseNumber, state }: SearchResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <AdSlot position="results-top" />
      </div>

      {error ? (
        <ErrorMessage message={error} />
      ) : result ? (
        <ResultCard result={result} licenseNumber={licenseNumber} state={state} />
      ) : (
        <NoResults licenseNumber={licenseNumber} state={state} />
      )}

      {!error && (
        <>
          <ResultFaqs />
          <div className="flex justify-center">
            <AdSlot position="between-faqs" />
          </div>
        </>
      )}

      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 font-semibold text-sm transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--primary-color)",
            color: "var(--primary-color)",
            borderRadius: "var(--radius)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          Search Again
        </Link>
      </div>
    </div>
  );
}
