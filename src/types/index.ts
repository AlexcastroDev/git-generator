export * from "./github";

export interface LanguageDictionary {
  [key: string]: number;
}

export interface PageParams {
  params: {
    username: string;
  };
}
