export interface Company {
  id: string;
  name?: string;
  parentId?: string;
  childrenIds: Set<string>;
  landIds: Set<string>;
}

export interface CompanyDictionary {
  [id: string]: Company;
}
