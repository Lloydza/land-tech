import { companyDictionaryMock as companyDictionary } from "../__mocks__/company";
import {
  countCompanyLandIds,
  getCompanyInformationDisplay,
  getLandParcelCountsToCompanyInformation,
} from "../helpers";

describe("helpers", () => {
  test("countCompanyLandIds", () => {
    expect(countCompanyLandIds("a", companyDictionary)).toEqual(6);
    expect(countCompanyLandIds("b", companyDictionary)).toEqual(3);
    expect(countCompanyLandIds("e", companyDictionary)).toEqual(3);
    expect(countCompanyLandIds("g", companyDictionary)).toEqual(0);
    expect(() =>
      countCompanyLandIds("non-existant", companyDictionary)
    ).toThrow("Cannot find company non-existant");
  });

  test("printCompanyLandCount", () => {
    expect(
      getCompanyInformationDisplay({
        companyId: "a",
        initialCompanyId: "b",
        companyDictionary,
        depth: 0,
      })
    ).toEqual("a; Company A; owner of 6 land parcels");

    expect(
      getCompanyInformationDisplay({
        companyId: "b",
        initialCompanyId: "b",
        companyDictionary,
        depth: 2,
      })
    ).toEqual(" | | - b; Company B; owner of 3 land parcels ***");

    expect(
      getCompanyInformationDisplay({
        companyId: "c",
        initialCompanyId: "f",
        companyDictionary,
        depth: 1,
      })
    ).toEqual(" | - c; Company C; owner of 1 land parcel");

    expect(
      getCompanyInformationDisplay({
        companyId: "g",
        initialCompanyId: "f",
        companyDictionary,
        depth: 0,
      })
    ).toEqual("g; Company G; owner of 0 land parcels");

    expect(() =>
      getCompanyInformationDisplay({
        companyId: "non-existant",
        initialCompanyId: "f",
        companyDictionary,
        depth: 0,
      })
    ).toThrow("Cannot find company non-existant");
  });

  test("printLandParcelCountsToCompany", () => {
    expect(
      getLandParcelCountsToCompanyInformation({
        companyId: "a",
        initialCompanyId: "i",
        depth: 0,
        idChain: ["a", "d", "h", "i"],
        companyDictionary,
      })
    ).toEqual([
      "a; Company A; owner of 6 land parcels",
      " | - c; Company C; owner of 1 land parcel",
      " | - d; Company D; owner of 3 land parcels",
      " | | - h; Company H; owner of 3 land parcels",
      " | | | - i; Company I; owner of 1 land parcel ***",
    ]);

    expect(() =>
      getLandParcelCountsToCompanyInformation({
        companyId: "non-existant",
        initialCompanyId: "i",
        depth: 0,
        idChain: ["a", "d", "h", "i"],
        companyDictionary,
      })
    ).toThrow("Cannot find company non-existant");
  });
});
