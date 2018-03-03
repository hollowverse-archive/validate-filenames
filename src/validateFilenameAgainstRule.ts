import { Rule, FilenameValidationResult } from './types';
import path from 'path';
import { flattenDeep, uniq, flow } from 'lodash';

const camelCaseFilenameRegex = /^[.]?([a-z])+([0-9]|[a-zA-Z]|[.])*$/;
const pascalCaseFilenameRegex = /^[.]?([A-Z])+([0-9]|[a-zA-Z]|[.])*$/;
const twoConsecutiveUppercaseLettersRegex = /^.*[A-Z]{2}.*$/;

const validationMap = new Map<Rule['validation'], RegExp>([
  ['camelCase', camelCaseFilenameRegex],
  ['PascalCase', pascalCaseFilenameRegex],
]);

export function validateFilenameAgainstRule(
  filename: string,
  rule: Rule,
): FilenameValidationResult {
  const result: FilenameValidationResult = {
    valid: true,
    invalidComponents: [],
  };

  const validationRegex = validationMap.get(rule.validation);

  if (validationRegex && rule.validation !== 'ignore') {
    const patternComponents = flow(
      (patterns: string[]) => patterns.map(pattern => pattern.split(path.sep)),
      flattenDeep,
      uniq,
    )(rule.patterns);

    filename.split(path.sep).forEach((filenameComponent, index) => {
      if (
        !patternComponents.includes(filenameComponent) &&
        (!validationRegex.test(filenameComponent) ||
          twoConsecutiveUppercaseLettersRegex.test(filenameComponent))
      ) {
        result.valid = false;
        result.invalidComponents.push(Number(index));
      }
    });
  }

  return result;
}
