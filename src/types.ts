export type Rule = {
  validation: 'camelCase' | 'PascalCase' | 'ignore';
  patterns: string[];
};

export type FilenameValidationResult = {
  valid: boolean;
  invalidComponents: number[];
};
