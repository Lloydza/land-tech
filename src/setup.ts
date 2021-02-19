const fs = require("fs");
import { Company, CompanyDictionary } from "./types";

const companyFactory = ({
  id,
  name,
  parentId,
}: Omit<Company, "childrenIds" | "landIds">): Company => {
  return {
    id,
    name: name || "???",
    parentId,
    childrenIds: new Set(),
    landIds: new Set(),
  };
};

// Fill company landIds
const fillCompanyParcels = (companyDictionary: CompanyDictionary): void => {
  fs.readFileSync("./data/land_ownership.csv", "utf8")
    .split("\n")
    .slice(1) // header row
    .forEach((line) => {
      const [landId, companyId] = line.split(",");
      if (companyDictionary[companyId]) {
        companyDictionary[companyId].landIds.add(landId);
      }
    });
};

// Creates a dictionary mapping of companies to parents and children
export const createCompanyDictionary = (): CompanyDictionary => {
  const companyDictionary = {} as CompanyDictionary;

  fs.readFileSync("./data/company_relations.csv", "utf8")
    .split("\n")
    .slice(1) // header row
    .forEach((line) => {
      const [id, name, parentId] = line.split(",");
      if (!!id) {
        // Create the company record, or update the details if its already in the dictionary
        if (companyDictionary[id]) {
          companyDictionary[id].name = name;
          companyDictionary[id].parentId = parentId;
        } else {
          companyDictionary[id] = companyFactory({ id, name, parentId });
        }
      }

      // If there is a parent, be sure to populate that parent's children records
      if (!!parentId) {
        if (!companyDictionary[parentId]) {
          companyDictionary[parentId] = companyFactory({ id: parentId });
        }
        companyDictionary[parentId].childrenIds.add(id);
      }
    });

  fillCompanyParcels(companyDictionary);

  return companyDictionary;
};
