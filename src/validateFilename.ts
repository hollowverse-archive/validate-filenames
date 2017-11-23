import { Rule, FilenameValidationResult } from './types';
import * as path from 'path';

const camelCaseFilenameRegex = /^[.]?([a-z])+([0-9]|[a-zA-Z]|[.])*$/;
const pascalCaseFilenameRegex = /^[.]?([A-Z])+([0-9]|[a-zA-Z]|[.])*$/;

const validationMap = new Map<Rule['validation'], RegExp>([
  ['camelCase', camelCaseFilenameRegex],
  ['PascalCase', pascalCaseFilenameRegex],
]);

export function validateFilename(
  filename: string,
  rule: Rule,
): FilenameValidationResult {
  const result: FilenameValidationResult = {
    valid: true,
    invalidComponents: [],
  };

  const validationRegex = validationMap.get(rule.validation);

  if (validationRegex && rule.validation !== 'ignore') {
    const patternComponents = [
      ...new Set(...rule.patterns.map(pattern => pattern.split(path.sep))),
    ];

    filename.split(path.sep).forEach((filenameComponent, index) => {
      if (
        !patternComponents.includes(filenameComponent) &&
        !validationRegex.test(filenameComponent)
      ) {
        result.valid = false;
        result.invalidComponents.push(Number(index));
      }
    });
  }

  return result;
}
