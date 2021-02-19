import { createCompanyDictionary } from "./setup";
import { getLandParcelCountsToCompanyInformation } from "./helpers";

const printLandParcelCountsFromRoot = (companyId: string): void => {
  const companyDictionary = createCompanyDictionary();

  // id chain is used to determine which branch to traverse
  const idChain = [companyId];
  let currentCompanyId = companyId;
  while (!!companyDictionary[currentCompanyId].parentId) {
    idChain.push(companyDictionary[currentCompanyId].parentId);
    currentCompanyId = companyDictionary[currentCompanyId].parentId;
  }
  idChain.reverse();

  const infoArray = getLandParcelCountsToCompanyInformation({
    companyId: currentCompanyId,
    initialCompanyId: companyId,
    idChain,
    depth: 0,
    companyDictionary,
  });

  infoArray.forEach((row) => console.log(row));
};

const runApp = () => {
  var customArgs = process.argv.slice(2);

  let id;
  let mode = "root"; // default
  customArgs.forEach((arg) => {
    const pair = arg.split(/=(.+)/);

    if (pair?.[0] === "--id") {
      id = pair[1];
    }

    if (pair?.[0] === "--mode") {
      mode = pair[1];
    }
  });

  if (!id) {
    throw new Error("Please provide a company id");
  }

  if (mode === "root") {
    printLandParcelCountsFromRoot(id);
  } else {
    throw new Error("Provided mode not yet supported");
  }
};

runApp();
