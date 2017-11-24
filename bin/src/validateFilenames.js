#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
require('babel-polyfill'); // tslint:disable-line
var program = require('commander');
var shelljs = require('shelljs');
var getFilenames_1 = require('./getFilenames');
var getFilenameValidationData_1 = require('./getFilenameValidationData');
var utils_1 = require('./utils');
// Setup arguments through the commander.js CLI framework
program
  .usage('-c [path]')
  .option('-c, --config [path]', 'path to config file (a JS module)')
  .parse(process.argv);
// If user doesn't provide any arguments, we'll display help
if (!program.config) {
  program.outputHelp();
  shelljs.exit(1);
}
// Kick off the program
main();
/* tslint:disable:non-literal-require no-console */
function main() {
  var config = void 0;
  var filenames = getFilenames_1.getFilenames();
  try {
    config = require(`${process.cwd()}/${program.config}`);
  } catch (e) {
    console.error('Could not read configurations file');
    shelljs.exit(1);
  }
  var filenamesValidationData = getFilenameValidationData_1.getFilenameValidationData(
    filenames,
    config.rules,
  );
  if (utils_1.allFilenamesAreValid(filenamesValidationData)) {
    console.log('All filenames are valid!');
    shelljs.exit(0);
  } else {
    console.log(
      `\n${utils_1.underline(
        'The file names below do not meet your validation rules:',
      )}\n`,
    );
    console.log(
      utils_1.prettyPrintFilenameValidationData(filenamesValidationData),
    );
  }
}
