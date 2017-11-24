'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var path = require('path');
var lodash_1 = require('lodash');
var camelCaseFilenameRegex = /^[.]?([a-z])+([0-9]|[a-zA-Z]|[.])*$/;
var pascalCaseFilenameRegex = /^[.]?([A-Z])+([0-9]|[a-zA-Z]|[.])*$/;
var twoConsecutiveUppercaseLettersRegex = /^.*[A-Z]{2}.*$/;
var validationMap = new Map([
  ['camelCase', camelCaseFilenameRegex],
  ['PascalCase', pascalCaseFilenameRegex],
]);
function validateFilenameAgainstRule(filename, rule) {
  var result = {
    valid: true,
    invalidComponents: [],
  };
  var validationRegex = validationMap.get(rule.validation);
  if (validationRegex && rule.validation !== 'ignore') {
    var patternComponents = lodash_1.flow(
      function(patterns) {
        return patterns.map(function(pattern) {
          return pattern.split(path.sep);
        });
      },
      lodash_1.flattenDeep,
      lodash_1.uniq,
    )(rule.patterns);
    filename.split(path.sep).forEach(function(filenameComponent, index) {
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
exports.validateFilenameAgainstRule = validateFilenameAgainstRule;
