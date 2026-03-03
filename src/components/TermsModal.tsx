"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/**
 * First-visit Terms & Conditions modal.
 *
 * Consent is stored in localStorage as:
 *   { version: "1.0", timestamp: ISO-string }
 *
 * Bump TERMS_VERSION whenever material terms change to re-prompt returning users.
 */

const TERMS_VERSION = "1.0";
const STORAGE_KEY = "mls_terms_consent";

interface StoredConsent {
  version: string;
  timestamp: string;
}

export function TermsModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      const consent: StoredConsent = JSON.parse(raw);
      if (consent.version !== TERMS_VERSION) {
        setVisible(true);
      }
    } catch {
      // If localStorage is unavailable or JSON is corrupt, show the modal
      setVisible(true);
    }
  }, []);

  const handleAgree = useCallback(() => {
    try {
      const consent: StoredConsent = {
        version: TERMS_VERSION,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // If storage fails, we still let the user proceed
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
        aria-describedby="terms-modal-desc"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col" style={{ borderRadius: "8px" }}>
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2
              id="terms-modal-title"
              className="text-lg font-bold text-gray-900"
              style={{ letterSpacing: "-0.3px" }}
            >
              Terms of Use &amp; Disclaimer
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Please read and accept before using this site.
            </p>
          </div>

          {/* Scrollable body */}
          <div
            id="terms-modal-desc"
            className="px-6 py-4 overflow-y-auto flex-1 text-sm text-gray-700 space-y-3"
          >
            <p>
              <strong>Medical License Search</strong> is an independent, public
              data aggregator. We are <strong>not affiliated</strong> with any
              state medical board, government agency, or licensing authority.
            </p>
            <p>
              The information displayed on this website is compiled from
              publicly available sources. We make <strong>no warranties</strong>{" "}
              — express or implied — regarding the accuracy, completeness,
              timeliness, or fitness for a particular purpose of any information
              provided.
            </p>
            <p>
              <strong>Do not rely on this site as the sole source</strong> for
              any credentialing, employment, or medical decision. Always verify
              license status directly with the relevant state medical board.
            </p>
            <p>
              By clicking &ldquo;I Agree,&rdquo; you acknowledge that you have
              read and understood these terms and agree to our full{" "}
              <Link
                href="/terms"
                target="_blank"
                className="underline hover:no-underline" style={{ color: "var(--primary-color)" }}
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="underline hover:no-underline" style={{ color: "var(--primary-color)" }}
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row-reverse gap-3">
            <button
              type="button"
              onClick={handleAgree}
              className="primary-button"
              style={{ fontSize: "14px", padding: "10px 24px" }}
              autoFocus
            >
              I Agree — Continue
            </button>
            <Link
              href="/terms"
              target="_blank"
              className="inline-flex justify-center items-center px-6 py-2.5 border text-sm transition-colors hover:bg-[whitesmoke]"
              style={{ borderColor: "var(--strock-color)", color: "var(--dark-color)", borderRadius: "100px" }}
            >
              Read Full Terms
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
