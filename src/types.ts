export type Rule = {
  validation: 'camelCase' | 'PascalCase' | 'ignore';
  patterns: string[];
};

export type FilenameValidationResult = {
  valid: boolean;
  invalidComponents: number[];
};

export type FilenameValidationDatum = [string, FilenameValidationResult];

export type FilenameValidationData = FilenameValidationDatum[];
