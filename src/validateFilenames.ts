#!/usr/bin/env node

/* tslint:disable */
require('babel-polyfill'); // tslint:disable-line

import * as program from 'commander';
import * as shelljs from 'shelljs';
import { getFilenames } from './getFilenames';
import { getFilenameValidationData } from './getFilenameValidationData';
import {
  allFilenamesAreValid,
  prettyPrintFilenamesValidationData,
  underline,
} from './utils';

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
  let config;
  const filenames = getFilenames();

  try {
    config = require(`${process.cwd()}/${program.config}`);
  } catch (e) {
    console.error('Could not read configurations file');
    shelljs.exit(1);
  }

  const filenamesValidationData = getFilenameValidationData(
    filenames,
    config.rules,
  );

  console.log(
    'allFilenamesAreValid(filenamesValidationData)',
    allFilenamesAreValid(filenamesValidationData),
  );

  if (allFilenamesAreValid(filenamesValidationData)) {
    console.log('All filenames are valid!');
    shelljs.exit(0);
  } else {
    console.log(
      `\n${underline(
        'The file names below do not meet your validation rules:',
      )}\n`,
    );
    console.log(prettyPrintFilenamesValidationData(filenamesValidationData));
  }
}
