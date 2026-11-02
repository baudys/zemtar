"use client";

import { useId } from "react";

type Props = {
  id?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  /** Formatted label shown above the thumb. */
  thumbLabel: string;
  /** Menší vertikální rezerva (např. ceník v jednom viewportu). */
  compact?: boolean;
  disabled?: boolean;
  "aria-valuetext"?: string;
  "aria-label"?: string;
};

export function YellowRange({
  id: idProp,
  min,
  max,
  step = 1,
  value,
  onChange,
  thumbLabel,
  compact = false,
  disabled = false,
  "aria-valuetext": ariaValueText,
  "aria-label": ariaLabel,
}: Props) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const span = Math.max(1, max - min);
  const pct = ((value - min) / span) * 100;

  return (
    <div className={compact ? "relative mt-2 pt-5" : "relative mt-8 pt-7"}>
      <div
        className="pointer-events-none absolute top-0 whitespace-nowrap font-display text-sm leading-none text-komatsu-yellow tabular-nums"
        style={{ left: `${pct}%`, translate: `-${pct}% 0` }}
        aria-hidden
      >
        {thumbLabel}
      </div>
      <div className="relative h-2 w-full">
        <div className="absolute inset-0 rounded-full bg-white/10" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-komatsu-yellow"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuetext={ariaValueText}
          aria-label={ariaLabel}
          className={[
            "yellow-range absolute inset-0 h-full w-full appearance-none bg-transparent",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
        />
      </div>
    </div>
  );
}
