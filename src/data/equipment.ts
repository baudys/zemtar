/**
 * Technika – stroje, nástavce a kontejnery.
 * Parametry strojů: katalog / odhad (cca) – doladit u provozovatele.
 * Nástavce minibagru: hodnoty ze štítků (listopad 2026).
 */

import { type SiteString } from "@/content/site";

export type EquipmentKind = "stroj" | "nastavec" | "kontejner";

export type WorkId =
  | "vykop"
  | "uzky-vykop"
  | "vrtani"
  | "prosevani"
  | "katrovani"
  | "teren"
  | "odvoz-suti"
  | "preprava";

export type EquipmentParam = {
  label: string;
  value: SiteString;
};

export type EquipmentItem = {
  id: string;
  name: string;
  /** Krátký popisek ve výběru Techniky. */
  shortName: string;
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

export const equipmentKindLabel: Record<EquipmentKind, string> = {
  stroj: "Stroj",
  nastavec: "Nástavec",
  kontejner: "Kontejner",
};

export type WorkType = {
  id: WorkId;
  label: string;
  /** Krátký popis na dlaždici výběru. */
  hook: string;
  /** Krátké vysvětlení po výběru. */
  explanation: string;
  /** Popisek slotů ve výsledku (např. Stroj + Nástavec). Druhý slot jen při konkrétním nástavci. */
  slotLabels: [string] | [string, string];
  /** Slug pro `?sluzba=` v poptávce. */
  inquirySlug: string;
  /** Doporučené položky (1 = jen stroj, 2 = stroj + nástavec/kontejner). */
  equipmentIds: [string] | [string, string];
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
    id: "prosevani",
    label: "Prosévání",
    hook: "Oddělení zeminy a drobného materiálu",
    explanation: "Prosévání zvládne minibagr s prosévací lžící 600 mm.",
    slotLabels: ["Stroj", "Nástavec"],
    inquirySlug: "prosevani",
    equipmentIds: ["minibagr", "lzice-prosevaci-600"],
  },
  {
    id: "katrovani",
    label: "Kátrování",
    hook: "Oddělení a třídění zeminy",
    explanation:
      "Kátrování řešíme minibagrem – konkrétní nástavec zatím doplníme podle zakázky.",
    slotLabels: ["Stroj"],
    inquirySlug: "katrovani",
    equipmentIds: ["minibagr"],
  },
  {
    id: "teren",
    label: "Terénní úpravy",
    hook: "Srovnání a modelace pozemku",
    explanation:
      "Terén upravíme minibagrem – svahová lžíce, hrábě nebo zubová podle pozemku.",
    slotLabels: ["Stroj", "Nástavec"],
    inquirySlug: "teren",
    equipmentIds: ["minibagr", "lzice-svahova"],
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
    shortName: "Minibagr",
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
    workIds: [
      "vykop",
      "uzky-vykop",
      "vrtani",
      "prosevani",
      "katrovani",
      "teren",
    ],
  },
  {
    id: "man-tgl",
    name: "MAN TGL 12.220",
    shortName: "MAN TGL",
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
    shortName: "Plošina",
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
    shortName: "Suťový kontejner",
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
    shortName: "Plošinový kontejner",
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
    shortName: "Vrták HT4",
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
    shortName: "Prosévací 600",
    kind: "nastavec",
    description: "Roštová lžíce na prosévání zeminy a oddělení drobného materiálu.",
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
    workIds: ["prosevani"],
  },
  {
    id: "lzice-zubova-600",
    name: "Zubová lžíce Triga 600 mm",
    shortName: "Zubová 600",
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
    shortName: "Lžíce 300",
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
  {
    id: "lzice-svahova",
    name: "Svahová lžíce",
    shortName: "Svahová lžíce",
    kind: "nastavec",
    description:
      "Srovnání a modelace svahů a povrchů při terénních úpravách.",
    params: [],
    image: "/photos/placeholder/technika-missing.webp",
    imageAlt: "Svahová lžíce na minibagr",
    workIds: ["teren"],
  },
  {
    id: "hrabe-120",
    name: "Hrábě 120 cm s hydraulickým náklopem",
    shortName: "Hrábě 120 cm",
    kind: "nastavec",
    description:
      "Hrábě šířky 120 cm s hydraulickým náklopem – úklid a srovnání povrchu při terénních úpravách.",
    params: [
      { label: "Šířka", value: "120 cm" },
      { label: "Náklop", value: "hydraulický" },
    ],
    image: "/photos/placeholder/technika-missing.webp",
    imageAlt: "Hrábě 120 cm s hydraulickým náklopem",
    workIds: ["teren"],
  },
];

export function getEquipment(id: string): EquipmentItem | undefined {
  return equipment.find((e) => e.id === id);
}

export function getWorkType(id: WorkId | null): WorkType | undefined {
  if (!id) return undefined;
  return workTypes.find((w) => w.id === id);
}

/**
 * Primární nabídka Techniky: bagr (+ nástavce) a kamion (+ plošina, kontejnery).
 * Lžíce, vrták a plošina nejsou samostatné položky v horním výběru.
 */
export type FleetUnit = {
  id: string;
  shortName: string;
  primaryId: string;
  accessoryIds: string[];
  /** Popisek bloku příslušenství. */
  accessoryLabel: string;
};

export const fleetUnits: FleetUnit[] = [
  {
    id: "bagr",
    shortName: "Minibagr",
    primaryId: "minibagr",
    accessoryIds: [
      "lzice-zubova-600",
      "lzice-300",
      "lzice-prosevaci-600",
      "lzice-svahova",
      "hrabe-120",
      "vrtak-ht4",
    ],
    accessoryLabel: "Nástavce",
  },
  {
    id: "kamion",
    shortName: "Nákladní automobil",
    primaryId: "man-tgl",
    accessoryIds: ["plosina-4m", "kontejner-sutovy", "kontejner-plosinovy"],
    accessoryLabel: "Plošina a kontejnery",
  },
];

export function getFleetUnit(id: string): FleetUnit | undefined {
  return fleetUnits.find((u) => u.id === id);
}

export function fleetUnitForEquipment(equipmentId: string): FleetUnit | undefined {
  return fleetUnits.find(
    (u) =>
      u.primaryId === equipmentId || u.accessoryIds.includes(equipmentId),
  );
}

/** Nástavec / druhá položka doporučené sestavy pro práci u dané jednotky. */
export function accessoryForWork(
  unit: FleetUnit,
  workId: WorkId,
): EquipmentItem | undefined {
  const work = getWorkType(workId);
  if (!work) return undefined;
  const accessoryId = work.equipmentIds.find((id) =>
    unit.accessoryIds.includes(id),
  );
  return accessoryId ? getEquipment(accessoryId) : undefined;
}

export function worksForUnit(unit: FleetUnit): WorkType[] {
  const primary = getEquipment(unit.primaryId);
  const ids = new Set<WorkId>(primary?.workIds ?? []);
  for (const id of unit.accessoryIds) {
    const item = getEquipment(id);
    item?.workIds.forEach((w) => ids.add(w));
  }
  return workTypes.filter((w) => ids.has(w.id));
}

export const equipmentByKind = {
  stroj: equipment.filter((e) => e.kind === "stroj"),
  nastavec: equipment.filter((e) => e.kind === "nastavec"),
  kontejner: equipment.filter((e) => e.kind === "kontejner"),
} as const;
