#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import shelljs from 'shelljs';
import { getFilenames } from './getFilenames';
import { getFilenameValidationData } from './getFilenameValidationData';
import { defaultConfig } from './defaultConfig';
import {
  allFilenamesAreValid,
  prettyPrintFilenameValidationData,
  underline,
} from './utils';

// Setup arguments through the commander.js CLI framework
program
  .usage('-c <path>')
  .option('-c, --config <path>', 'path to config file (a JS module)')
  .parse(process.argv);

// Kick off the program
main();

/* tslint:disable:non-literal-require no-console */
function main() {
  let config;
  const filenames = getFilenames();

  try {
    config = require(path.join(process.cwd(), program.config));
  } catch (e) {
    console.error(
      'Could not read configurations file. Falling back on default configurations.',
    );

    config = defaultConfig;
  }

  const filenamesValidationData = getFilenameValidationData(
    filenames,
    config.rules,
  );

  if (allFilenamesAreValid(filenamesValidationData)) {
    shelljs.exit(0);
  } else {
    console.log(
      `\n${underline(
        'The file names below do not meet your validation rules:',
      )}\n`,
    );
    console.log(prettyPrintFilenameValidationData(filenamesValidationData));
    process.exit(1);
  }
}
