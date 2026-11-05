"use client";

import { useId, type ReactNode } from "react";
import { track } from "@vercel/analytics";
import { formatCzk, site } from "@/content/site";
import { landmarkForKm } from "@/content/map-towns";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Section } from "@/components/ui/Section";
import { YellowRange } from "@/components/ui/YellowRange";
import {
  type ContainerMode,
  containerStandingPrice,
  quoteRates,
  useQuote,
} from "@/components/quote/QuoteContext";

const KM_MAX = 60;
const IDLE_MAX = 8;

const CONTAINER_OPTIONS: ReadonlyArray<{
  value: ContainerMode;
  label: string;
}> = [
  { value: "none", label: "Bez kontejneru" },
  { value: "plato", label: "Plošinový" },
  { value: "sutovy", label: "Suťový" },
];

function ControlGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="font-display text-base uppercase tracking-tight text-white sm:text-lg">
        {title}
      </p>
      <div className="mt-2.5 divide-y divide-line/80 border-y border-line/80 sm:mt-3">
        {children}
      </div>
    </div>
  );
}

function ControlRow({
  label,
  htmlFor,
  rate,
  note,
  children,
  className = "",
}: {
  label: ReactNode;
  htmlFor?: string;
  rate?: ReactNode;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const labelClass =
    "min-w-0 text-sm leading-snug text-white sm:text-[0.9375rem]";
  return (
    <div className={`py-3 sm:py-3.5 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        {htmlFor ? (
          <label htmlFor={htmlFor} className={labelClass}>
            {label}
          </label>
        ) : (
          <p className={labelClass}>{label}</p>
        )}
        {rate ? (
          <p className="shrink-0 text-xs tabular-nums text-komatsu-yellow sm:text-sm">
            {rate}
          </p>
        ) : null}
      </div>
      {note ? (
        <p className="mt-1 text-[11px] leading-snug text-white/60 sm:text-xs">
          {note}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export function Pricing() {
  const hoursId = useId();
  const idleId = useId();
  const kmId = useId();
  const daysId = useId();
  const liquidationId = useId();
  const { draft, setDraft, estimate, applyToContact } = useQuote();
  const townHint = landmarkForKm(estimate.kmOneWay);
  const hasContainer = draft.containerMode !== "none";
  const standingPrice = containerStandingPrice(draft.containerDays);

  function continueToContact() {
    applyToContact();
    track("quote_to_contact", { source: "pricing" });
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Section id="cenik" tone="deep" className="!border-t-0 !py-12 md:!py-14">
      <header>
        <h2 className="font-display text-4xl uppercase leading-[1.15] tracking-tight text-white md:text-6xl lg:text-7xl">
          Ceník
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/65 md:mt-3 md:text-base md:whitespace-nowrap">
          {site.pricingDisclaimer}
        </p>
      </header>

      <div className="mt-5 grid gap-5 sm:mt-6 lg:mt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-start lg:gap-8">
        <fieldset className="min-w-0 space-y-5 border-0 p-0 sm:space-y-6">
          <legend className="sr-only">Parametry zakázky</legend>

          <ControlGroup title="Bagr a doprava">
            <ControlRow
              htmlFor={hoursId}
              label="Hodiny práce"
              rate={`${formatCzk(quoteRates.hourly)}/h`}
              note={`Min. ${quoteRates.minHours} h · vč. naložení / přepravy / vyložení`}
            >
              <YellowRange
                id={hoursId}
                compact
                min={quoteRates.minHours}
                max={24}
                step={1}
                value={draft.hours}
                onChange={(hours) => setDraft({ hours })}
                thumbLabel={`${estimate.hours} h`}
                aria-valuetext={`${estimate.hours} hodin`}
              />
            </ControlRow>

            <ControlRow
              htmlFor={idleId}
              label="Prostoje"
              rate={`${formatCzk(quoteRates.idleRate)}/h`}
              note="Bagr stojí a čeká"
            >
              <YellowRange
                id={idleId}
                compact
                min={0}
                max={IDLE_MAX}
                step={1}
                value={Math.min(IDLE_MAX, draft.idleHours)}
                onChange={(idleHours) => setDraft({ idleHours })}
                thumbLabel={`${estimate.idleHours} h`}
                aria-valuetext={`${estimate.idleHours} hodin prostojů`}
              />
            </ControlRow>

            <ControlRow
              htmlFor={kmId}
              label="Vzdálenost (jedním směrem)"
              rate={`${formatCzk(quoteRates.kmRate)}/km`}
              note={
                <>
                  Tam i zpět
                  {townHint ? (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-komatsu-yellow">
                        např. {townHint}
                      </span>
                    </>
                  ) : null}
                </>
              }
            >
              <YellowRange
                id={kmId}
                compact
                min={0}
                max={KM_MAX}
                step={1}
                value={Math.min(KM_MAX, draft.kmOneWay)}
                onChange={(kmOneWay) => setDraft({ kmOneWay })}
                thumbLabel={`${estimate.kmOneWay} km`}
                aria-valuetext={
                  townHint
                    ? `${estimate.kmOneWay} kilometrů, např. ${townHint}`
                    : `${estimate.kmOneWay} kilometrů`
                }
              />
            </ControlRow>
          </ControlGroup>

          <ControlGroup title="Kontejner 4,5 m">
            <ControlRow
              label="Typ (~5 m³)"
              note="Přistavení a stání. Likvidace zvlášť."
            >
              <div
                role="radiogroup"
                aria-label="Typ kontejneru"
                className="mt-2.5 flex flex-wrap gap-2"
              >
                {CONTAINER_OPTIONS.map((opt) => {
                  const selected = draft.containerMode === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setDraft({ containerMode: opt.value })}
                      className={`cursor-pointer border px-2.5 py-1.5 text-xs transition sm:px-3 sm:text-sm ${
                        selected
                          ? "border-komatsu-yellow bg-komatsu-yellow text-void"
                          : "border-line text-white/70 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </ControlRow>

            {hasContainer ? (
              <div className="grid gap-0 sm:grid-cols-2">
                <ControlRow
                  htmlFor={daysId}
                  label="Dny stání"
                  rate={formatCzk(standingPrice)}
                  className="sm:pr-8"
                >
                  <YellowRange
                    id={daysId}
                    compact
                    min={1}
                    max={quoteRates.containerDaysMax}
                    step={1}
                    value={Math.min(
                      quoteRates.containerDaysMax,
                      draft.containerDays,
                    )}
                    onChange={(containerDays) => setDraft({ containerDays })}
                    thumbLabel={`${estimate.containerDays} d`}
                    aria-valuetext={`${estimate.containerDays} dní stání`}
                  />
                </ControlRow>
                <label
                  htmlFor={liquidationId}
                  className="flex h-full cursor-pointer items-start gap-2.5 border-t border-line/80 py-3 sm:border-t-0 sm:border-l sm:px-4 sm:py-3.5"
                >
                  <input
                    id={liquidationId}
                    type="checkbox"
                    checked={draft.liquidation}
                    onChange={(e) =>
                      setDraft({ liquidation: e.target.checked })
                    }
                    className="mt-0.5 size-4 shrink-0 accent-komatsu-yellow"
                  />
                  <span>
                    <span className="block text-sm text-white">
                      Odvoz a likvidace
                    </span>
                    <span className="mt-1 block text-[11px] text-white/60 sm:text-xs">
                      od {formatCzk(quoteRates.liquidationFrom)} · dle druhu
                    </span>
                  </span>
                </label>
              </div>
            ) : null}
          </ControlGroup>
        </fieldset>

        <aside
          className="flex min-w-0 flex-col border border-line bg-void/60 p-3 sm:p-4 lg:sticky lg:top-24"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-display text-base uppercase tracking-tight text-white sm:text-lg">
            Orientační součet
          </p>

          <ul className="mt-2.5 space-y-0 divide-y divide-line/80 border-y border-line/80 sm:mt-3">
            {estimate.lines.map((line) => (
              <li
                key={line.id}
                className="flex items-baseline justify-between gap-3 py-2 sm:py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">{line.label}</p>
                  {line.detail ? (
                    <p className="mt-0.5 truncate text-[11px] text-white/60">
                      {line.detail}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 font-display text-base text-white tabular-nums">
                  <CountUp value={line.amount} />
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-3 pt-1 sm:mt-4">
            <p className="text-xs text-white/60">Celkem bez DPH</p>
            <p className="mt-0.5 font-display text-2xl uppercase tracking-tight text-white tabular-nums sm:text-4xl">
              <CountUp value={estimate.totalEx} />
            </p>
            <p className="mt-0.5 text-xs text-white/60 sm:text-sm">
              <CountUp value={estimate.totalInc} /> s DPH (
              {Math.round(site.vatRate * 100)}&nbsp;%)
            </p>
          </div>

          <Button
            type="button"
            className="mt-3 w-full py-2.5 sm:mt-4"
            onClick={continueToContact}
          >
            Pokračovat k poptávce
          </Button>
          <p className="mt-1.5 text-[11px] leading-snug text-white/60 sm:mt-2">
            Odhad není závazná nabídka. Finální cenu potvrdíme předem.
          </p>
        </aside>
      </div>
    </Section>
  );
}
