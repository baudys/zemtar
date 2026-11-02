/**
 * Technika – stroje, nástavce a kontejnery.
 * Parametry strojů: katalog / odhad (cca) – doladit u provozovatele.
 * Nástavce minibagru: hodnoty ze štítků (listopad 2026).
 */

import { type SiteString } from "@/content/site";

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
      "Přepravu strojů a mechanismů řeší plošina MULTITEC na MAN TGL 12.220.",
    slotLabels: ["Plošina", "Nosič"],
    inquirySlug: "plosina-navijak",
    equipmentIds: ["plosina-4m", "man-tgl"],
  },
];

export const equipment: EquipmentItem[] = [
  {
    id: "minibagr",
    name: "Komatsu PC38MR",
    kind: "stroj",
    description:
      "Kompaktní pásové minirypadlo s uzavřenou kabinou a zkráceným přesahem zádi – výkopy, terénní úpravy i práce ve stísněných prostorách. Nástavec zvolíme podle práce.",
    params: [
      { label: "Provozní hmotnost", value: "přibližně 3,7–4,0 t" },
      { label: "Šířka", value: "1,74 m" },
      { label: "Hloubka výkopu", value: "až 3,45 m" },
      { label: "Kabina", value: "uzavřená" },
      { label: "Podvozek", value: "pásový" },
      { label: "Záď", value: "zkrácený přesah" },
    ],
    image: "/photos/pc38mr-studio.webp",
    imageAlt: "Minibagr Komatsu PC38MR",
    workIds: ["vykop", "uzky-vykop", "vrtani", "katrovani", "teren"],
  },
  {
    id: "man-tgl",
    name: "MAN TGL 12.220",
    kind: "stroj",
    description:
      "Nákladní automobil s přepravní plošinou MULTITEC – přeprava stavebních strojů, mechanismů a další techniky, přistavení kontejnerů i odvoz materiálu.",
    params: [
      { label: "Celková hmotnost", value: "12 000 kg" },
      { label: "Výkon", value: "162 kW (220 k)" },
      { label: "Nápravy", value: "4×2" },
      { label: "Nástavba", value: "přepravní plošina MULTITEC" },
      { label: "Nosnost plošiny", value: "cca 5 t" },
    ],
    image: "/photos/man-tgl-real.webp",
    imageAlt: "Nákladní auto MAN TGL 12.220 s plošinou MULTITEC",
    workIds: ["odvoz-suti", "preprava"],
  },
  {
    id: "plosina-4m",
    name: "Přepravní plošina MULTITEC",
    kind: "stroj",
    description:
      "Přepravní plošina MULTITEC na MAN TGL – stavební stroje, pracovní mechanismy a další technika. Funguje i samostatně, bez bagru.",
    params: [
      { label: "Nástavba", value: "MULTITEC" },
      { label: "Délka", value: "cca 4,5 m" },
      { label: "Nosnost", value: "cca 5 t" },
      { label: "Nosič", value: "MAN TGL 12.220" },
    ],
    image: "/photos/man-tgl-studio.webp",
    imageAlt: "Přepravní plošina MULTITEC na MAN TGL",
    workIds: ["preprava"],
  },
  {
    id: "kontejner-sutovy",
    name: "Suťový kontejner",
    kind: "kontejner",
    description:
      "Odvoz stavební suti, betonu, zeminy, výkopového materiálu a odpadu při rekonstrukcích – i bez bagru.",
    params: [
      { label: "Délka", value: "4 500 mm" },
      { label: "Objem", value: "cca 5 m³" },
      { label: "Max. náklad", value: "cca 5 t" },
    ],
    image: "/photos/placeholder/kontejner-sutovy.webp",
    imageAlt: "Suťový kontejner 4 500 mm",
    workIds: ["odvoz-suti"],
  },
  {
    id: "kontejner-plosinovy",
    name: "Plošinový kontejner",
    kind: "kontejner",
    description:
      "Přeprava rozměrných a těžších nákladů – stroje, paletovaný materiál, ocelové konstrukce.",
    params: [
      { label: "Délka", value: "4 500 mm" },
      { label: "Objem", value: "cca 5 m³" },
      { label: "Max. náklad", value: "cca 5 t" },
    ],
    image: "/photos/placeholder/kontejner-plato.webp",
    imageAlt: "Plošinový kontejner 4 500 mm",
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
