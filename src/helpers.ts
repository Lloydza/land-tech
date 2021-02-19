import { CompanyDictionary } from "./types";

export const countCompanyLandIds = (
  companyId: string,
  companyDictionary: CompanyDictionary
): number => {
  if (!companyDictionary?.[companyId]) {
    throw new Error(`Cannot find company ${companyId}`);
  }

  if (companyDictionary[companyId].childrenIds.size === 0) {
    return companyDictionary[companyId].landIds.size;
  }

  // Traverse all the way down, counting the land ids for all children recursively (not ideal)
  // TODO: Optimise (see readme)
  let landCount = companyDictionary[companyId].landIds.size;
  companyDictionary[companyId].childrenIds.forEach(
    (childId) =>
      (landCount = landCount + countCompanyLandIds(childId, companyDictionary))
  );
  return landCount;
};

interface GetCompanyInformationDisplayProps {
  companyId: string;
  initialCompanyId: string;
  depth: number;
  companyDictionary: CompanyDictionary;
}

export const getCompanyInformationDisplay = ({
  companyId,
  initialCompanyId,
  depth,
  companyDictionary,
}: GetCompanyInformationDisplayProps): string => {
  if (!companyDictionary?.[companyId]) {
    throw new Error(`Cannot find company ${companyId}`);
  }

  const landCount = countCompanyLandIds(companyId, companyDictionary);
  const depthIndicator = " |".repeat(depth);

  return `${depthIndicator}${
    !!depthIndicator.length ? " - " : ""
  }${companyId}; ${
    companyDictionary[companyId].name
  }; owner of ${landCount} land parcel${landCount !== 1 ? "s" : ""}${
    initialCompanyId === companyId ? " ***" : ""
  }`;
};

interface GetLandParcelCountsToCompanyInformationProps {
  companyId: string;
  initialCompanyId: string;
  idChain: string[];
  depth: number;
  companyDictionary: CompanyDictionary;
  result?: string[];
}

export const getLandParcelCountsToCompanyInformation = ({
  companyId,
  initialCompanyId,
  idChain,
  depth,
  companyDictionary,
  result = [],
}: GetLandParcelCountsToCompanyInformationProps): string[] => {
  if (!companyDictionary[companyId]) {
    throw new Error(`Cannot find company ${companyId}`);
  }

  if (!idChain.length) {
    return;
  }

  // If the current node matches the id of a branch we want to traverse in the chain, print it first then visit all the children recursively
  if (idChain[depth] === companyId) {
    result.push(
      getCompanyInformationDisplay({
        companyId,
        initialCompanyId,
        depth,
        companyDictionary,
      })
    );

    if (depth < idChain.length - 1) {
      companyDictionary[companyId].childrenIds.forEach((childId) =>
        getLandParcelCountsToCompanyInformation({
          companyId: childId,
          initialCompanyId,
          idChain,
          depth: depth + 1,
          companyDictionary,
          result,
        })
      );
    }
  } else {
    result.push(
      getCompanyInformationDisplay({
        companyId,
        initialCompanyId,
        depth,
        companyDictionary,
      })
    );
  }

  return result;
};
