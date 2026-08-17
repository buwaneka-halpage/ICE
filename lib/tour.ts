export type MapNodeId = "water-gardens" | "mirror-wall" | "lion-paw" | "frescoes";

export type TourGroup = {
  id: "A" | "B" | "C";
  guide: string;
  role: string;
  headcount: number;
  location: string;
  node: MapNodeId;
  wpm: number;
  snippet: string;
};

export const TOUR_GROUPS: TourGroup[] = [
  {
    id: "A",
    guide: "Chaminda K.",
    role: "Lead Guide",
    headcount: 18,
    location: "Western Water Gardens",
    node: "water-gardens",
    wpm: 130,
    snippet:
      "These limestone conduits were engineered in the 5th century to keep the fountains pressurised without mechanical pumps.",
  },
  {
    id: "B",
    guide: "Ruwan P.",
    role: "Lead Guide",
    headcount: 14,
    location: "Mirror Wall",
    node: "mirror-wall",
    wpm: 124,
    snippet:
      "The plaster still holds verses left by visitors a thousand years ago — a guest book in lime and grammar.",
  },
  {
    id: "C",
    guide: "Nimali S.",
    role: "Lead Guide",
    headcount: 9,
    location: "Lion’s Paw Terrace",
    node: "lion-paw",
    wpm: 118,
    snippet:
      "The paws are the last remaining fragment of a colossal lion staircase that once framed the final ascent.",
  },
];

export const WANDERING = {
  guestId: 108,
  label: "Tourist #108",
  detail: "Solo Route — 45m from group towards Frescoes",
  fromTour: "C" as const,
  node: "frescoes" as MapNodeId,
};

export const AR_LAYER = {
  name: "Water Gardens Hydraulic AR Illusion",
  state: "Active",
  accuracy: 98.2,
};

export const ACOUSTIC = {
  guideDb: -12,
  ambientDb: -6,
  ancDb: -24,
};

export const UTILIZATION_SPARK = [
  54, 51, 49, 58, 67, 74, 81, 86, 89, 88, 90, 87.5,
];

export const QA_FLAGS_TODAY = 0;

export const OPERATOR_SITE = {
  company: "Aitken Spence Travels",
  fleetLabel: "Central Province Fleet",
  filter: "Today, Aug 2026 — Sigiriya Operations",
  admin: { name: "Priya Mendis", role: "Head of Experiences" },
};

export const COMPANION = {
  site: "Sigiriya Rock Fortress",
  guide: "Chaminda",
  battery: 82,
  mode: "Visual Overlay + Audio Guide",
  language: "Deutsch",
  lookingAt: {
    title: "Western Water Gardens (Fountain #3)",
    body: "A gravity-fed fountain head. Conduits under the limestone still hold the original fall line.",
  },
  prompts: [
    "How did the hydraulics work?",
    "Show ancient water level",
    "Simplify explanation",
  ],
};

export const JOURNEY = [
  {
    time: "08:30",
    title: "Bus ride briefing",
    detail: "Audio translated to German · 22 min",
    badge: null as string | null,
    sight: "pidurangala" as const,
  },
  {
    time: "09:45",
    title: "Water Gardens",
    detail: "Fountain #3 · hydraulic overlay unlocked",
    badge: "Hydraulic Engineering",
    sight: "sigiriya" as const,
  },
  {
    time: "10:30",
    title: "Sigiriya Frescoes",
    detail: "Custom Solo Art Route taken",
    badge: "Solo Art Route",
    sight: "dambulla" as const,
  },
];

export const QA_LOG = [
  {
    q: "Who painted the Sigiriya maidens?",
    a: "Commissioned by King Kashyapa in 477 CE. The surviving frescoes in the western pocket are tempera on plaster — likely court painters, not a single named artist.",
  },
  {
    q: "How did the fountains run without pumps?",
    a: "A stepped cistern system used gravity and pressure differentials. Water from the summit moats fed limestone conduits; fountain heads sat below the supply line.",
  },
  {
    q: "Why is the Mirror Wall so smooth?",
    a: "A fine lime plaster burnished while wet. It originally reflected the gardens below — hence the name. Poems were later incised into the same surface.",
  },
];

export const VAULT_MOMENTS = [
  {
    id: "vg-01",
    title: "Sigiriya from the gardens",
    meta: "Lion Rock · 5th c. palace",
    sight: "sigiriya",
  },
  {
    id: "pd-01",
    title: "Pidurangala at golden hour",
    meta: "Opposite terrace · monastic",
    sight: "pidurangala",
  },
  {
    id: "db-01",
    title: "Dambulla cave shrine",
    meta: "UNESCO · 1st c. BCE",
    sight: "dambulla",
  },
  {
    id: "kd-01",
    title: "Temple of the Tooth",
    meta: "Kandy · Sri Dalada Maligawa",
    sight: "tooth",
  },
  {
    id: "an-01",
    title: "Ruwanwelisaya dagoba",
    meta: "Anuradhapura · Dutugemunu",
    sight: "ruwan",
  },
  {
    id: "pl-01",
    title: "Polonnaruwa vatadage",
    meta: "12th c. relic house",
    sight: "polonnaruwa",
  },
  {
    id: "gl-01",
    title: "Galle Fort light",
    meta: "Dutch ramparts · UNESCO",
    sight: "galle",
  },
  {
    id: "sp-01",
    title: "Sri Pada before dawn",
    meta: "Adam’s Peak pilgrim path",
    sight: "sri-pada",
  },
] as const;
