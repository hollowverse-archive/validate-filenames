#!/usr/bin/env node

import shelljs from 'shelljs';
import { getFilenames } from './getFilenames';
import { getFilenameValidationData } from './getFilenameValidationData';
import { defaultConfig } from './defaultConfig';
import {
  allFilenamesAreValid,
  prettyPrintFilenameValidationData,
  underline,
} from './utils';
import cosmiconfig from 'cosmiconfig';
import { Config } from './types';

const CONFIG_NAME = 'validateFilenames';

/* tslint:disable:non-literal-require no-console */
function main() {
  const filenames = getFilenames();
  const result = cosmiconfig(CONFIG_NAME, {
    packageProp: false,
    rc: CONFIG_NAME,
    rcExtensions: true,
    js: CONFIG_NAME,
    sync: true,
  }).load();

  let config: Config;

  if (!result) {
    console.error(
      'Could not read configuration file. Falling back on default configurations.',
    );

    config = defaultConfig;
  } else {
    config = result.config as Config;
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

// Kick off the program
main();
