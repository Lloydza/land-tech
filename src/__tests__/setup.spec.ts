import {
  companyDictionaryMock,
  company_relations_csvMock,
  land_ownership_svcMock,
} from "../__mocks__/company";
import { createCompanyDictionary } from "../setup";

jest.mock("fs", () => ({
  readFileSync: (path: string): string => {
    if (path.indexOf("land_ownership.csv") !== -1) {
      return land_ownership_svcMock;
    }

    if (path.indexOf("company_relations.csv") !== -1) {
      return company_relations_csvMock;
    }

    throw new Error("Incorrect setup fs mock");
  },
}));

describe("setup", () => {
  test("createCompanyDictionary", () => {
    const generatedCompanyDictionary = createCompanyDictionary();
    expect(generatedCompanyDictionary).toEqual(companyDictionaryMock);
  });
});
