"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
  Active:    { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  Inactive:  { bg: "#f9fafb", text: "#6b7280", border: "#e5e7eb" },
  Suspended: { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  Expired:   { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
};

const STATUSES = ["Active", "Inactive", "Suspended", "Expired"] as const;

function AnimatedStatusWord() {
  const [index, setIndex] = useState(0);
  const statuses = useMemo(() => STATUSES, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((prev) => (prev === statuses.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(id);
  }, [index, statuses]);

  return (
    <div
      className="flex items-center justify-center gap-3 mt-3 mb-6"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        style={{
          fontFamily: "var(--body-font-one)",
          color: "var(--gray-color)",
          fontSize: "26px",
          letterSpacing: "-0.3px",
        }}
      >
        Is it
      </span>

      {/* Fixed-width container so layout doesn't shift between words */}
      <span
        className="relative inline-flex items-center justify-center overflow-hidden"
        style={{ width: "148px", height: "42px" }}
      >
        {statuses.map((status, i) => {
          const cfg = STATUS_CONFIG[status];
          return (
            <motion.span
              key={status}
              className="absolute inset-0 flex items-center justify-center font-semibold border"
              style={{
                background: cfg.bg,
                color: cfg.text,
                borderColor: cfg.border,
                borderRadius: "4px",
                letterSpacing: "0px",
                fontSize: "20px",
              }}
              initial={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
              animate={
                index === i
                  ? { y: 0, opacity: 1 }
                  : { y: index > i ? -40 : 40, opacity: 0 }
              }
            >
              {status}
            </motion.span>
          );
        })}
      </span>

      <span
        style={{
          fontFamily: "var(--body-font-one)",
          color: "var(--gray-color)",
          fontSize: "26px",
          letterSpacing: "-0.3px",
        }}
      >
        ?
      </span>
    </div>
  );
}

export { AnimatedStatusWord };
