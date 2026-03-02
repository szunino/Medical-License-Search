"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "DMCA / Removal Request", href: "/removal" },
];

const inputCls =
  "block w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5700] focus:border-[#ff5700] transition";
const inputStyle = { borderRadius: "var(--radius)", borderColor: "#e4e4e4" };
const labelCls = "block text-sm font-medium mb-1";

export default function RemovalPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-default py-20 text-center">
        <div
          className="mx-auto mb-4 h-16 w-16 flex items-center justify-center bg-green-100"
          style={{ borderRadius: "50%" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600" aria-hidden="true">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="mb-2" style={{ fontSize: "28px" }}>Request Submitted</h1>
        <p className="max-w-md mx-auto" style={{ color: "var(--gray-color)" }}>
          We have received your request and will review it within 5–10 business
          days. We will contact you at the email address provided.
        </p>
      </div>
    );
  }

  return (
    <div className="container-default py-10">
      <div className="mb-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>

      <h1 className="mb-3">DMCA &amp; Data Removal Request</h1>

      <div className="prose-content space-y-4 mb-10">
        <p>
          Medical License Search displays information compiled from publicly
          available state medical board records. In some cases, you may have
          grounds to request the removal or correction of data about yourself.
        </p>

        <div className="border p-5" style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe", borderRadius: "var(--radius)", fontSize: "14px", color: "#1e3a8a" }}>
          <p className="font-semibold mb-2">Before submitting a removal request, please note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              We aggregate data from <strong>public records</strong> maintained by
              state medical boards. This data is legally public.
            </li>
            <li>
              We cannot remove data that must remain public by law (active license
              records, board orders, disciplinary actions).
            </li>
            <li>
              If data is <strong>factually inaccurate</strong>, the primary source
              of error is the relevant state board. We encourage you to update
              your record with the board directly, and we will sync accordingly.
            </li>
            <li>
              For copyright claims (DMCA), please include your contact information,
              identification of the copyrighted work, and a statement of good-faith
              belief that the use is not authorized.
            </li>
          </ul>
        </div>

        <p>
          Requests will be reviewed within <strong>5–10 business days</strong>.
          We will contact you at the email provided to discuss the outcome.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border p-6 sm:p-8 space-y-5"
        style={{ borderColor: "var(--strock-color)", borderRadius: "var(--radius)" }}
        aria-label="Removal request form"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="removal-name" className={labelCls} style={{ color: "var(--dark-color)" }}>
              Your Full Name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="removal-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Dr. Jane Smith"
              className={inputCls}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="removal-email" className={labelCls} style={{ color: "var(--dark-color)" }}>
              Email Address <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="removal-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="jane@example.com"
              className={inputCls}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label htmlFor="removal-type" className={labelCls} style={{ color: "var(--dark-color)" }}>
            Request Type <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="removal-type"
            name="requestType"
            required
            className={inputCls}
            style={inputStyle}
          >
            <option value="">Select a type…</option>
            <option value="data-removal">Data Removal — I am the subject and request removal</option>
            <option value="data-correction">Data Correction — The information is factually incorrect</option>
            <option value="dmca">DMCA Copyright Claim</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="removal-license" className={labelCls} style={{ color: "var(--dark-color)" }}>
            License Number (if applicable)
          </label>
          <input
            id="removal-license"
            type="text"
            name="licenseNumber"
            placeholder="State-issued license number"
            className={inputCls}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="removal-description" className={labelCls} style={{ color: "var(--dark-color)" }}>
            Description <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="removal-description"
            name="description"
            rows={5}
            required
            placeholder="Describe your request in detail, including the URL of the page in question, the specific data you are requesting to be removed or corrected, and the reason for your request."
            className={`${inputCls} resize-none`}
            style={inputStyle}
          />
        </div>

        {/* DMCA declaration */}
        <div className="flex items-start gap-3">
          <input
            id="removal-declaration"
            type="checkbox"
            name="declaration"
            required
            className="mt-0.5 h-4 w-4"
          />
          <label htmlFor="removal-declaration" className="text-sm" style={{ color: "var(--dark-color)" }}>
            I declare under penalty of perjury that the information provided in
            this request is accurate and that I have a good-faith belief that
            the use of the material complained of is not authorized by the
            copyright owner, its agent, or applicable law.
          </label>
        </div>

        <button type="submit" className="hero-button"
          style={{
            backgroundColor: "#343434",
            color: "white",
            padding: "12px 28px",
            fontFamily: "var(--heading-font)",
            fontWeight: 500,
            fontSize: "15px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
