'use strict';

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance',
      );
    }
  };
})();

Object.defineProperty(exports, '__esModule', { value: true });
var path = require('path');
function underline(text) {
  return `\x1b[4m${text}\x1b[0m`;
}
exports.underline = underline;
function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}
exports.red = red;
function allFilenamesAreValid(filenameValidationData) {
  return filenameValidationData.every(function(filenameValidationDatum) {
    var _filenameValidationDa = _slicedToArray(filenameValidationDatum, 2),
      filenameValidationResult = _filenameValidationDa[1];

    return filenameValidationResult.valid;
  });
}
exports.allFilenamesAreValid = allFilenamesAreValid;
function prettyPrintFilenameValidationData(filenameValidationData) {
  return filenameValidationData
    .filter(function(filenameValidationDatum) {
      var _filenameValidationDa2 = _slicedToArray(filenameValidationDatum, 2),
        filenameValidationResult = _filenameValidationDa2[1];

      return !filenameValidationResult.valid;
    })
    .map(function(filenameValidationDatum) {
      var _filenameValidationDa3 = _slicedToArray(filenameValidationDatum, 2),
        filename = _filenameValidationDa3[0],
        invalidComponents = _filenameValidationDa3[1].invalidComponents;
      // Break-up the filename into its components and map the invalid ones to a highlighted red string

      return `• ${filename
        .split(path.sep)
        .map(function(filenameComponent, index) {
          if (invalidComponents.includes(index)) {
            return red(filenameComponent);
          }
          return filenameComponent;
        })
        .join(path.sep)}`;
    })
    .join('\n');
}
exports.prettyPrintFilenameValidationData = prettyPrintFilenameValidationData;
