import { CompanyDictionary } from "../types";

export const companyDictionaryMock = {
  a: {
    id: "a",
    name: "Company A",
    parentId: "",
    childrenIds: new Set(["c", "d"]),
    landIds: new Set(["1", "2"]),
  },
  b: {
    id: "b",
    name: "Company B",
    parentId: "",
    childrenIds: new Set(["e"]),
    landIds: new Set([]),
  },
  c: {
    id: "c",
    name: "Company C",
    parentId: "a",
    childrenIds: new Set(["f", "g"]),
    landIds: new Set(["3"]),
  },
  d: {
    id: "d",
    name: "Company D",
    parentId: "a",
    childrenIds: new Set(["h"]),
    landIds: new Set([]),
  },
  e: {
    id: "e",
    name: "Company E",
    parentId: "b",
    childrenIds: new Set([]),
    landIds: new Set(["4", "5", "6"]),
  },
  f: {
    id: "f",
    name: "Company F",
    parentId: "c",
    childrenIds: new Set([]),
    landIds: new Set([]),
  },
  g: {
    id: "g",
    name: "Company G",
    parentId: "c",
    childrenIds: new Set([]),
    landIds: new Set([]),
  },
  h: {
    id: "h",
    name: "Company H",
    parentId: "d",
    childrenIds: new Set(["i"]),
    landIds: new Set(["7", "8"]),
  },
  i: {
    id: "i",
    name: "Company I",
    parentId: "h",
    childrenIds: new Set([]),
    landIds: new Set(["9"]),
  },
} as CompanyDictionary;

export const company_relations_csvMock =
  "header\na,Company A,\nb,Company B,\nc,Company C,a\nd,Company D,a\ne,Company E,b\nf,Company F,c\ng,Company G,c\nh,Company H,d\ni,Company I,h";

export const land_ownership_svcMock =
  "header\n1,a\n2,a\n3,c\n4,e\n5,e\n6,e\n7,h\n8,h\n9,i";
