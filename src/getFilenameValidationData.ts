import * as minimatch from 'minimatch';
import { validateFilenameAgainstRule } from './validateFilenameAgainstRule';
import {
  Rule,
  FilenameValidationResult,
  FilenameValidationData,
} from './types';

function filenameMatchesPattern(filename: string, pattern: string) {
  return minimatch(filename, pattern, { matchBase: true });
}

function filenameMatchesAnyPattern(filename: string, patterns: string[]) {
  return patterns.some(pattern => {
    return filenameMatchesPattern(filename, pattern);
  });
}

function getLastApplicableRule(filename: string, rules: Rule[]) {
  let lastApplicableRule;

  for (const rule of rules) {
    if (filenameMatchesAnyPattern(filename, rule.patterns)) {
      lastApplicableRule = rule;
    }
  }

  return lastApplicableRule;
}

export function getFilenameValidationData(filenames: string[], rules: Rule[]) {
  return filenames.map(filename => {
    let result: FilenameValidationResult = {
      valid: true,
      invalidComponents: [],
    };
    const lastApplicableRule = getLastApplicableRule(filename, rules);

    if (lastApplicableRule) {
      result = validateFilenameAgainstRule(filename, lastApplicableRule);
    }

    return [filename, result] as [string, FilenameValidationResult];
  });
}
