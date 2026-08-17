/** Wikimedia Commons stills for the companion vault. Width-capped thumbs. */

const commons = (path: string) =>
  `https://upload.wikimedia.org/wikipedia/commons/${path}`;

export type Sight = {
  id: string;
  title: string;
  place: string;
  era: string;
  src: string;
};

export const SIGHTS: Sight[] = [
  {
    id: "sigiriya",
    title: "Sigiriya Rock Fortress",
    place: "Central Province",
    era: "5th century · Kashyapa I",
    src: commons("thumb/c/c7/Sigiriya.jpg/1280px-Sigiriya.jpg"),
  },
  {
    id: "pidurangala",
    title: "Pidurangala from the west",
    place: "Opposite Lion Rock",
    era: "Monastic terrace",
    src: commons("thumb/8/8e/Pidurangala_Rock.jpg/1280px-Pidurangala_Rock.jpg"),
  },
  {
    id: "dambulla",
    title: "Dambulla Cave Temple",
    place: "UNESCO · Golden Temple",
    era: "1st century BCE",
    src: commons("thumb/9/96/Dambulla_cave_temple.jpg/1280px-Dambulla_cave_temple.jpg"),
  },
  {
    id: "tooth",
    title: "Sri Dalada Maligawa",
    place: "Kandy",
    era: "Temple of the Tooth",
    src: commons("thumb/1/1e/Sri_Dalada_Maligawa.jpg/1280px-Sri_Dalada_Maligawa.jpg"),
  },
  {
    id: "ruwan",
    title: "Ruwanwelisaya",
    place: "Anuradhapura",
    era: "2nd century BCE · Dutugemunu",
    src: commons("thumb/a/aa/Ruwanwelisaya.jpg/1280px-Ruwanwelisaya.jpg"),
  },
  {
    id: "polonnaruwa",
    title: "Polonnaruwa Vatadage",
    place: "Ancient City of Polonnaruwa",
    era: "12th century",
    src: commons("thumb/a/ae/Polonnaruwa_Vatadage.jpg/1280px-Polonnaruwa_Vatadage.jpg"),
  },
  {
    id: "galle",
    title: "Galle Fort lighthouse",
    place: "Southern Province",
    era: "Dutch ramparts · UNESCO",
    src: commons("thumb/b/b0/Galle_Fort_Lighthouse.jpg/1280px-Galle_Fort_Lighthouse.jpg"),
  },
  {
    id: "sri-pada",
    title: "Sri Pada (Adam’s Peak)",
    place: "Ratnapura District",
    era: "Pilgrim path",
    src: commons("thumb/d/d2/Adams_Peak.jpg/1280px-Adams_Peak.jpg"),
  },
];

export const SIGHT_BY_ID = Object.fromEntries(SIGHTS.map((s) => [s.id, s])) as Record<
  string,
  Sight
>;
