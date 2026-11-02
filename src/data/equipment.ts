/**
 * Technika – stroje, nástavce a kontejnery.
 * Parametry strojů: jen ověřené hodnoty; jinak `ex("{{…}}")`.
 * Nástavce minibagru: hodnoty ze štítků (listopad 2026).
 */

import { ex, type SiteString } from "@/content/site";

export type EquipmentKind = "stroj" | "nastavec" | "kontejner";

export type EquipmentParam = {
  label: string;
  value: SiteString;
};

export type EquipmentItem = {
  id: string;
  name: string;
  kind: EquipmentKind;
  description: string;
  params: EquipmentParam[];
  image: string;
  imageAlt: string;
  /** Doplňkový detail (štítek) – ne hlavní náhled, pokud existuje `image`. */
  plateImage?: string;
  plateImageAlt?: string;
  /** Id typů prací, ke kterým se položka hodí. */
  workIds: WorkId[];
};

export type WorkId =
  | "vykop"
  | "uzky-vykop"
  | "vrtani"
  | "katrovani"
  | "teren"
  | "odvoz-suti"
  | "preprava";

export type WorkType = {
  id: WorkId;
  label: string;
  /** Krátký popis na dlaždici výběru. */
  hook: string;
  /** Krátké vysvětlení po výběru. */
  explanation: string;
  /** Popisek slotů ve výsledku (např. Stroj + Nástavec). */
  slotLabels: [string, string];
  /** Slug pro `?sluzba=` v poptávce. */
  inquirySlug: string;
  /** Primární doporučené položky (výsledek sestavy). */
  equipmentIds: [string, string];
};

export const workTypes: WorkType[] = [
  {
    id: "vykop",
    label: "Výkop",
    hook: "Základy, jímky, běžné zemní práce",
    explanation:
      "Pro běžné výkopy jedeme s minibagrem a zubovou lžící 600 mm.",
    slotLabels: ["Stroj", "Nástavec"],
    inquirySlug: "vykop",
    equipmentIds: ["minibagr", "lzice-zubova-600"],
  },
  {
    id: "uzky-vykop",
    label: "Úzký výkop",
    hook: "Přípojky vody, kanalizace, elektro",
    explanation: "Na přípojky sedí minibagr s úzkou lžící 300 mm.",
    slotLabels: ["Stroj", "Nástavec"],
    inquirySlug: "pripojky",
    equipmentIds: ["minibagr", "lzice-300"],
  },
  {
    id: "vrtani",
    label: "Vrtání sloupků",
    hook: "Díry na plot a oplocení",
    explanation: "Sloupky vrtáme minibagrem s hydraulickým vrtákem HT4.",
    slotLabels: ["Stroj", "Nástavec"],
    inquirySlug: "vrtani-der",
    equipmentIds: ["minibagr", "vrtak-ht4"],
  },
  {
    id: "katrovani",
    label: "Kátrování",
    hook: "Prosévání a oddělení zeminy",
    explanation: "Kátrování zvládne minibagr s prosévací lžící 600 mm.",
    slotLabels: ["Stroj", "Nástavec"],
    inquirySlug: "katrovani",
    equipmentIds: ["minibagr", "lzice-prosevaci-600"],
  },
  {
    id: "teren",
    label: "Terénní úpravy",
    hook: "Srovnání a modelace pozemku",
    explanation:
      "Terén upravíme minibagrem – přesný nástavec doladíme podle pozemku.",
    slotLabels: ["Stroj", "Nástavec"],
    inquirySlug: "teren",
    equipmentIds: ["minibagr", "lzice-zubova-600"],
  },
  {
    id: "odvoz-suti",
    label: "Odvoz suti",
    hook: "Kontejner a odvoz materiálu",
    explanation: "Suť odvezeme MAN TGL se suťovým kontejnerem – i bez bagru.",
    slotLabels: ["Doprava", "Kontejner"],
    inquirySlug: "odvoz-suti",
    equipmentIds: ["man-tgl", "kontejner-sutovy"],
  },
  {
    id: "preprava",
    label: "Přeprava / odtah",
    hook: "Stroje, auta, naviják",
    explanation:
      "Přepravu a odtah řeší 4m plošina s navijákem na MAN TGL.",
    slotLabels: ["Plošina", "Nosič"],
    inquirySlug: "plosina-navijak",
    equipmentIds: ["plosina-4m", "man-tgl"],
  },
];

export const equipment: EquipmentItem[] = [
  {
    id: "minibagr",
    name: "Minibagr Komatsu",
    kind: "stroj",
    description:
      "Minibagr s obsluhou – výkopy, přípojky, terén i vrtání děr. Nástavec zvolíme podle práce.",
    params: [
      { label: "Model", value: ex("{{KOMATSU_MODEL}}") },
      { label: "Provozní hmotnost", value: ex("{{KOMATSU_HMOTNOST}}") },
    ],
    image: "/photos/pc38mr-studio.webp",
    imageAlt: "Minibagr Komatsu",
    workIds: ["vykop", "uzky-vykop", "vrtani", "katrovani", "teren"],
  },
  {
    id: "man-tgl",
    name: "Nákladní MAN TGL",
    kind: "stroj",
    description:
      "Nosič kontejnerů a plošiny – doprava materiálu, přistavení kontejneru i přeprava strojů.",
    params: [
      { label: "Parametry", value: ex("{{MAN_TGL_PARAMETRY}}") },
    ],
    image: "/photos/man-tgl-real.webp",
    imageAlt: "Nákladní auto MAN TGL – nosič kontejnerů",
    workIds: ["odvoz-suti", "preprava"],
  },
  {
    id: "plosina-4m",
    name: "4m plošina s navijákem",
    kind: "stroj",
    description:
      "Přeprava strojů a vozidel; lze použít i jako odtahovku. Funguje i samostatně, bez bagru.",
    params: [
      { label: "Parametry", value: ex("{{PLOSINA_PARAMETRY}}") },
    ],
    image: "/photos/man-tgl-studio.webp",
    imageAlt: "4m plošina s navijákem na MAN TGL",
    workIds: ["preprava"],
  },
  {
    id: "kontejner-sutovy",
    name: "Suťové kontejnery",
    kind: "kontejner",
    description:
      "Přistavení suťového kontejneru a odvoz materiálu – i bez bagru.",
    params: [
      { label: "Objem", value: ex("{{OBJEM_SUTOVY_KONTEJNER}}") },
    ],
    image: "/photos/placeholder/kontejner-sutovy.webp",
    imageAlt: "Suťový kontejner",
    workIds: ["odvoz-suti"],
  },
  {
    id: "kontejner-plosinovy",
    name: "Plošinové kontejnery",
    kind: "kontejner",
    description: "Plošinový kontejner na materiál – přistavení a odvoz dle domluvy.",
    params: [
      { label: "Parametry", value: ex("{{PLOSINOVY_KONTEJNER_PARAMETRY}}") },
    ],
    image: "/photos/placeholder/kontejner-plato.webp",
    imageAlt: "Plošinový kontejner",
    workIds: ["odvoz-suti"],
  },
  {
    id: "vrtak-ht4",
    name: "Hydraulický vrták Hošek Trade HT4",
    kind: "nastavec",
    description:
      "Vrtání děr pro sloupky a oplocení – šnek 200 mm, zuby z karbidu wolframu.",
    params: [
      { label: "Průměr šneku", value: "200 mm" },
      { label: "Délka šneku", value: "1 200 mm" },
      { label: "Zuby", value: "karbid wolframu" },
    ],
    image: "/technika/vrtak-ht4.jpg",
    imageAlt: "Hydraulický vrták Hošek Trade HT4 se šnekem",
    plateImage: "/technika/vrtak-stitek.jpg",
    plateImageAlt: "Štítek vrtáku – průměr 200 mm, délka 1 200 mm",
    workIds: ["vrtani"],
  },
  {
    id: "lzice-prosevaci-600",
    name: "Prosévací lžíce Triga 600 mm",
    kind: "nastavec",
    description: "Roštová lžíce na kátrování a prosévání zeminy.",
    params: [
      { label: "Šířka", value: "600 mm" },
      { label: "Hmotnost", value: "126 kg" },
      { label: "Objem", value: "0,13 m³" },
      { label: "Rok výroby", value: "2026" },
    ],
    image: "/technika/lzice-prosevaci-600.jpg",
    imageAlt: "Prosévací (roštová) lžíce Triga 600 mm",
    plateImage: "/technika/lzice-prosevaci-stitek.jpg",
    plateImageAlt: "Štítek prosévací lžíce Triga 600 mm",
    workIds: ["katrovani"],
  },
  {
    id: "lzice-zubova-600",
    name: "Zubová lžíce Triga 600 mm",
    kind: "nastavec",
    description: "Běžné výkopy – rychloupínač Symlock.",
    params: [
      { label: "Šířka", value: "600 mm" },
      { label: "Objem", value: "0,13 m³" },
      { label: "Hmotnost", value: "97 kg" },
      { label: "Rychloupínač", value: "Symlock" },
      { label: "Rok výroby", value: "2026" },
    ],
    image: "/technika/lzice-zubova-600.jpg",
    imageAlt: "Zubová lžíce Triga 600 mm",
    plateImage: "/technika/lzice-zubova-600-stitek.jpg",
    plateImageAlt: "Štítek zubové lžíce Triga 600 mm",
    workIds: ["vykop", "teren"],
  },
  {
    id: "lzice-300",
    name: "Lžíce Triga 300 mm",
    kind: "nastavec",
    description: "Úzké výkopy – přípojky vody, kanalizace a elektro.",
    params: [
      { label: "Šířka", value: "300 mm" },
      { label: "Objem", value: "0,05 m³" },
      { label: "Hmotnost", value: "67 kg" },
      { label: "Rok výroby", value: "2026" },
    ],
    /** Hlavní fotka zatím chybí – dočasně štítek; AssetOrPlaceholder zvládne i chybějící soubor. */
    image: "/technika/lzice-300-stitek.jpg",
    imageAlt: "Lžíce Triga 300 mm – výrobní štítek",
    plateImage: "/technika/lzice-300-stitek.jpg",
    plateImageAlt: "Štítek lžíce Triga 300 mm",
    workIds: ["uzky-vykop"],
  },
];

export const equipmentByKind = {
  stroj: equipment.filter((e) => e.kind === "stroj"),
  nastavec: equipment.filter((e) => e.kind === "nastavec"),
  kontejner: equipment.filter((e) => e.kind === "kontejner"),
} as const;

export function getWorkType(id: WorkId | null): WorkType | undefined {
  if (!id) return undefined;
  return workTypes.find((w) => w.id === id);
}
