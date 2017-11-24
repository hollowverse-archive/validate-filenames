'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var shelljs = require('shelljs');
function getFilenames() {
  // Let's only validate files managed by git
  var _shelljs$exec = shelljs.exec('git ls-files', { silent: true }),
    stdout = _shelljs$exec.stdout;

  if (typeof stdout === 'string') {
    // remove empty strings from the array and remove files in ignored paths
    return stdout.split('\n').filter(function(file) {
      return file.length !== 0;
    });
  }
  console.error('Unable to read git tree, is this a git repository?');
  shelljs.exit(1);
  return [];
}
exports.getFilenames = getFilenames;
