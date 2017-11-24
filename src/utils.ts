import { FilenameValidationData } from './types';
import * as path from 'path';

export function underline(text: string) {
  return `\x1b[4m${text}\x1b[0m`;
}

export function red(text: string) {
  return `\x1b[31m${text}\x1b[0m`;
}

export function allFilenamesAreValid(
  filenameValidationData: FilenameValidationData,
) {
  return filenameValidationData.every(filenameValidationDatum => {
    const [, filenameValidationResult] = filenameValidationDatum;
    return filenameValidationResult.valid;
  });
}

export function prettyPrintFilenamesValidationData(
  filenameValidationData: FilenameValidationData,
) {
  return (
    filenameValidationData
      // Remove valid files because we don't want to tell the user about valid files
      .filter(filenameValidationDatum => {
        const [, filenameValidationResult] = filenameValidationDatum;
        return !filenameValidationResult.valid;
      })

      // Transform the validation data so that invalid components of the filename are highlighted red
      .map(filenameValidationDatum => {
        const [filename, { invalidComponents }] = filenameValidationDatum;

        // Break-up the filename into its components and map the invalid ones to a highlighted red string
        return (
          filename
            .split(path.sep)
            .map((filenameComponent: string, index: number) => {
              if (invalidComponents.includes(index)) {
                return red(filenameComponent);
              }

              return filenameComponent;
            })
            // Join the filename components back.
            .join(path.sep)
        );
      })
      // Transform the array of invalid filenames into a newline separated big string.
      .join('\n')
  );
}
