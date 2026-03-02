"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

const inputCls =
  "block w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5700] focus:border-[#ff5700] transition";
const inputStyle = { borderRadius: "var(--radius)", borderColor: "#e4e4e4" };
const labelCls = "block text-sm font-medium mb-1" ;

export default function ContactPage() {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-green-600"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="mb-2" style={{ fontSize: "28px" }}>Message Received</h1>
        <p style={{ color: "var(--gray-color)" }}>
          Thank you for reaching out. We aim to respond within 2–3 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="container-default py-10">
      <div className="mb-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>

      <h1 className="mb-3">Contact Us</h1>
      <p className="mb-8" style={{ color: "var(--gray-color)", fontSize: "16px" }}>
        Have a question, a correction request, or feedback? Use the form below.
        For data removal or DMCA requests, please use the{" "}
        <a href="/removal" style={{ color: "var(--primary-color)" }} className="underline">
          dedicated removal page
        </a>
        .
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border p-6 sm:p-8 space-y-5"
        style={{ borderColor: "var(--strock-color)", borderRadius: "var(--radius)" }}
        aria-label="Contact form"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className={labelCls} style={{ color: "var(--dark-color)" }}>
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Jane Smith"
              className={inputCls}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelCls} style={{ color: "var(--dark-color)" }}>
              Email Address
            </label>
            <input
              id="contact-email"
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
          <label htmlFor="contact-subject" className={labelCls} style={{ color: "var(--dark-color)" }}>
            Subject
          </label>
          <select
            id="contact-subject"
            name="subject"
            className={inputCls}
            style={inputStyle}
          >
            <option value="general">General Inquiry</option>
            <option value="data-accuracy">Data Accuracy / Correction</option>
            <option value="removal">Data Removal Request</option>
            <option value="technical">Technical Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelCls} style={{ color: "var(--dark-color)" }}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="Describe your inquiry..."
            className={`${inputCls} resize-none`}
            style={inputStyle}
          />
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
          Send Message
        </button>

        <p style={{ fontSize: "12px", color: "var(--gray-color)" }}>
          We typically respond within 2–3 business days. For urgent data removal
          requests, please use the{" "}
          <a href="/removal" className="underline" style={{ color: "var(--primary-color)" }}>
            removal form
          </a>
          .
        </p>
      </form>
    </div>
  );
}
