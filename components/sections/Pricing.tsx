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

function FieldHint({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-xs leading-snug text-white/60">{children}</p>;
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: ReactNode;
}) {
  const className = "block text-xs text-white/65 sm:text-sm";
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={className}>
        {children}
      </label>
    );
  }
  return <p className={className}>{children}</p>;
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
    <Section id="cenik" tone="deep" className="!border-t-0">
      <header className="max-w-3xl">
        <h2 className="font-display text-4xl uppercase leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
          Ceník
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/65 md:mt-5 md:text-lg">
          {site.pricingDisclaimer}
        </p>
      </header>

      <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-start lg:gap-8">
        <fieldset className="min-w-0 space-y-4 border-0 p-0 sm:space-y-5">
          <legend className="sr-only">Parametry zakázky</legend>

            <div>
              <FieldLabel htmlFor={hoursId}>Hodiny práce</FieldLabel>
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
              <FieldHint>
                Min. {quoteRates.minHours} h · {formatCzk(quoteRates.hourly)}/h
                · vč. naložení/přepravy/vyložení
              </FieldHint>
            </div>

            <div>
              <FieldLabel htmlFor={idleId}>Prostoje</FieldLabel>
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
              <FieldHint>
                {formatCzk(quoteRates.idleRate)}/h · bagr stojí a čeká
              </FieldHint>
            </div>

            <div>
              <FieldLabel htmlFor={kmId}>Vzdálenost (jedním směrem)</FieldLabel>
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
              <FieldHint>
                Tam i zpět · {formatCzk(quoteRates.kmRate)}/km
                {townHint ? (
                  <>
                    {" "}
                    ·{" "}
                    <span className="text-komatsu-yellow">např. {townHint}</span>
                  </>
                ) : null}
              </FieldHint>
            </div>

            <div>
              <FieldLabel>Kontejner 4,5&nbsp;m (~5&nbsp;m³)</FieldLabel>
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
            </div>

            {hasContainer ? (
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <FieldLabel htmlFor={daysId}>Dny stání</FieldLabel>
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
                  <FieldHint>Teď {formatCzk(standingPrice)}</FieldHint>
                </div>
                <label
                  htmlFor={liquidationId}
                  className="flex cursor-pointer items-start gap-2 self-end pb-1 sm:pt-6"
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
                    <span className="block text-sm text-white/85">
                      Odvoz a likvidace
                    </span>
                    <span className="mt-0.5 block text-[11px] text-white/60">
                      od {formatCzk(quoteRates.liquidationFrom)} · dle druhu
                    </span>
                  </span>
                </label>
              </div>
            ) : null}
          </fieldset>

          <aside
            className="flex min-w-0 flex-col border border-line bg-void/60 p-2.5 sm:p-4 lg:sticky lg:top-24"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-xs text-white/65">Orientační součet</p>

            <ul className="mt-1.5 space-y-1.5 sm:mt-2 sm:space-y-2.5 lg:mt-3">
              {estimate.lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-1.5 sm:pb-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white/85">{line.label}</p>
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

            <div className="mt-2 border-t border-line pt-2 sm:mt-3 sm:pt-3">
              <p className="text-xs text-white/65">Celkem bez DPH</p>
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
              className="mt-2.5 w-full py-2.5 sm:mt-4"
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
