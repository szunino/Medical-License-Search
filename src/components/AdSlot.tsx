"use client";

/**
 * AdSlot – placeholder component for display advertising units.
 *
 * Replace the inner content with your actual ad provider code
 * (Google AdSense, Mediavine, AdThrive, etc.) once your site is approved.
 * The outer shell provides consistent sizing and responsive behaviour.
 *
 * Ad positions:
 *   "results-top"      – leaderboard above the results table
 *   "right-rail"       – sidebar on desktop, collapsed on mobile
 *   "between-faqs"     – rectangle between FAQ sections
 *   "footer"           – horizontal banner above the footer
 */

export type AdPosition =
  | "results-top"
  | "right-rail"
  | "between-faqs"
  | "footer";

interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

const SLOT_SIZES: Record<AdPosition, { width: number; height: number; label: string }> = {
  "results-top":   { width: 728, height: 90,  label: "Leaderboard (728×90)" },
  "right-rail":    { width: 300, height: 250, label: "Medium Rectangle (300×250)" },
  "between-faqs":  { width: 336, height: 280, label: "Large Rectangle (336×280)" },
  "footer":        { width: 728, height: 90,  label: "Leaderboard (728×90)" },
};

export function AdSlot({ position, className = "" }: AdSlotProps) {
  const { width, height, label } = SLOT_SIZES[position];

  // In production, replace this entire return block with your ad provider's
  // script / ins tag. Keep the outer wrapper div for layout stability.
  return (
    <div
      className={`ad-slot ad-slot--${position} ${className}`}
      style={{ minWidth: `min(100%, ${width}px)`, minHeight: height }}
      aria-label="Advertisement"
      role="complementary"
    >
      {/* ── PLACEHOLDER — replace with real ad code below this comment ── */}
      <div
        className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 text-gray-400 text-xs rounded"
        style={{ width: "100%", height }}
      >
        <span className="select-none">[Ad Slot: {label}]</span>
      </div>
      {/* ── End placeholder ── */}
    </div>
  );
}
