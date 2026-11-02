"use client";

import { useId, useState } from "react";
import {
  equipment,
  workTypes,
  type EquipmentItem,
  type WorkId,
} from "@/src/data/equipment";
import { useQuote } from "@/components/quote/QuoteContext";
import { AssetOrPlaceholder } from "@/components/ui/AssetOrPlaceholder";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { track } from "@vercel/analytics";
import { isPlaceholderPhotoPath, showPlaceholders } from "@/lib/placeholders";

function itemById(id: string): EquipmentItem | undefined {
  return equipment.find((e) => e.id === id);
}

type FocusSlot = "a" | "b";

function StageImage({ item }: { item: EquipmentItem }) {
  const showEx = showPlaceholders();
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-void">
      <AssetOrPlaceholder
        key={item.id}
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
        loading="eager"
      />
      <span
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        aria-hidden
      />
      {showEx && isPlaceholderPhotoPath(item.image) ? (
        <span className="absolute right-2 top-2 border border-line bg-void/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-komatsu-yellow lg:right-3 lg:top-3 lg:text-[10px]">
          ilustr.
        </span>
      ) : null}
    </div>
  );
}

function FocusThumb({
  item,
  label,
  selected,
  onSelect,
}: {
  item: EquipmentItem;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      title={item.name}
      className={[
        "flex min-w-0 flex-1 items-center gap-2 border p-1.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-komatsu-yellow sm:gap-3 sm:p-2",
        selected
          ? "border-komatsu-yellow bg-panel"
          : "border-line bg-transparent hover:border-white/35",
      ].join(" ")}
    >
      <span className="relative aspect-[4/3] h-11 shrink-0 overflow-hidden bg-void sm:h-14 lg:h-16">
        <AssetOrPlaceholder
          src={item.image}
          alt=""
          fill
          sizes="80px"
          className="object-cover"
          loading="lazy"
        />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] text-white/60 sm:text-[11px]">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-xs text-white sm:text-sm">
          {item.name}
        </span>
      </span>
    </button>
  );
}

export function Fleet() {
  const workGroupId = useId();
  const { fleet, setFleetWork, applyFleetToContact } = useQuote();
  const workId = fleet.workId;
  const [focus, setFocus] = useState<FocusSlot>("a");

  const work = workTypes.find((w) => w.id === workId) ?? workTypes[0]!;
  const [idA, idB] = work.equipmentIds;
  const itemA = itemById(idA) ?? equipment[0]!;
  const itemB = itemById(idB) ?? equipment[1]!;
  const [labelA, labelB] = work.slotLabels;
  const stageItem = focus === "a" ? itemA : itemB;
  const stageLabel = focus === "a" ? labelA : labelB;

  function selectWork(id: WorkId) {
    setFleetWork(id);
    setFocus("a");
  }

  function goToInquiry() {
    applyFleetToContact();
    track("fleet_to_contact", { work: work.id });
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="technika"
      className="border-t border-line bg-void py-8 md:py-12 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <header className="max-w-2xl">
          <h2 className="font-display text-4xl uppercase leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
            Technika
          </h2>
          <p className="mt-2 text-sm text-white/65 sm:mt-3 sm:text-base md:text-lg">
            Vyberte typ práce – sestavu a fotku hned uvidíte. Bez cen.
          </p>
        </header>

        {/* Mobil: typ práce → fotka → sestava. Desktop: fotka | panel. */}
        <div className="mt-5 grid min-w-0 gap-4 sm:mt-6 sm:gap-5 lg:mt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)] lg:items-start lg:gap-10">
          {/* Ovládání — na mobilu první */}
          <aside className="order-1 min-w-0 flex flex-col gap-4 lg:order-2 lg:sticky lg:top-24 lg:gap-6">
            <div>
              <p id={workGroupId} className="text-sm text-white/65">
                Typ práce
              </p>
              <div
                role="radiogroup"
                aria-labelledby={workGroupId}
                className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
              >
                {workTypes.map((w) => {
                  const checked = w.id === workId;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => selectWork(w.id)}
                      className={[
                        "shrink-0 border px-2.5 py-1.5 text-sm whitespace-nowrap transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-komatsu-yellow sm:px-3 sm:py-2",
                        checked
                          ? "border-komatsu-yellow bg-komatsu-yellow text-void"
                          : "border-line text-white hover:border-white/40",
                      ].join(" ")}
                    >
                      {w.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1.5 text-xs text-white/60 sm:mt-2 sm:text-sm">
                {work.hook}
              </p>
            </div>

            {/* Sestava — na mobilu až pod fotkou (order přes sibling v DOM ne; shrnutí držíme zde ale desktop-only detaily) */}
            <div className="hidden border-t border-line pt-5 lg:block">
              <p className="text-sm text-white/65">Vaše sestava</p>
              <ul className="mt-3 space-y-3">
                <li>
                  <p className="text-[11px] text-white/60">{labelA}</p>
                  <p className="font-display text-lg uppercase leading-tight">
                    {itemA.name}
                  </p>
                  {itemA.params[0] ? (
                    <p className="mt-0.5 text-sm text-komatsu-yellow">
                      <Placeholder value={itemA.params[0].value} />
                    </p>
                  ) : null}
                </li>
                <li>
                  <p className="text-[11px] text-white/60">{labelB}</p>
                  <p className="font-display text-lg uppercase leading-tight">
                    {itemB.name}
                  </p>
                  {itemB.params.slice(0, 2).map((p) => (
                    <p key={p.label} className="mt-0.5 text-sm text-komatsu-yellow">
                      {p.label}: <Placeholder value={p.value} />
                    </p>
                  ))}
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {work.explanation}
              </p>
            </div>

            <div className="hidden flex-col gap-3 lg:flex">
              <Button type="button" variant="primary" onClick={goToInquiry}>
                Poptat tuto práci
              </Button>
              <p className="text-sm text-white/65">
                Vhodnou techniku pro vaši zakázku doporučíme po telefonu.
              </p>
            </div>
          </aside>

          {/* Stage */}
          <div className="order-2 min-w-0 lg:order-1">
            <p className="mb-1.5 truncate text-xs text-white/60 sm:mb-2 sm:text-sm">
              {stageLabel}
              <span className="text-white/40"> · </span>
              <span className="text-white/80">{stageItem.name}</span>
            </p>
            <StageImage item={stageItem} />

            <div
              role="group"
              aria-label="Přepnout náhled sestavy"
              className="mt-2 flex min-w-0 gap-1.5 sm:mt-3 sm:gap-2"
            >
              <FocusThumb
                item={itemA}
                label={labelA}
                selected={focus === "a"}
                onSelect={() => setFocus("a")}
              />
              <FocusThumb
                item={itemB}
                label={labelB}
                selected={focus === "b"}
                onSelect={() => setFocus("b")}
              />
            </div>

            {/* Mobilní shrnutí + CTA pod fotkou */}
            <div className="mt-4 border border-line bg-panel/50 p-3 lg:hidden">
              <p className="text-sm leading-snug text-white/80">
                {work.explanation}
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="min-w-0">
                  <dt className="text-white/60">{labelA}</dt>
                  <dd className="truncate font-medium text-white">{itemA.name}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-white/60">{labelB}</dt>
                  <dd className="truncate font-medium text-white">{itemB.name}</dd>
                </div>
              </dl>
              <Button
                type="button"
                variant="primary"
                className="mt-3 w-full"
                onClick={goToInquiry}
              >
                Poptat tuto práci
              </Button>
              <p className="mt-2 text-xs text-white/65">
                Vhodnou techniku pro vaši zakázku doporučíme po telefonu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
