'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var minimatch = require('minimatch');
var validateFilenameAgainstRule_1 = require('./validateFilenameAgainstRule');
function filenameMatchesPattern(filename, pattern) {
  return minimatch(filename, pattern, { matchBase: true });
}
function filenameMatchesAnyPattern(filename, patterns) {
  return patterns.some(function(pattern) {
    return filenameMatchesPattern(filename, pattern);
  });
}
function getLastApplicableRule(filename, rules) {
  var lastApplicableRule = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = rules[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var rule = _step.value;

      if (filenameMatchesAnyPattern(filename, rule.patterns)) {
        lastApplicableRule = rule;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return lastApplicableRule;
}
function getFilenameValidationData(filenames, rules) {
  return filenames.map(function(filename) {
    var result = {
      valid: true,
      invalidComponents: [],
    };
    var lastApplicableRule = getLastApplicableRule(filename, rules);
    if (lastApplicableRule) {
      result = validateFilenameAgainstRule_1.validateFilenameAgainstRule(
        filename,
        lastApplicableRule,
      );
    }
    return [filename, result];
  });
}
exports.getFilenameValidationData = getFilenameValidationData;
