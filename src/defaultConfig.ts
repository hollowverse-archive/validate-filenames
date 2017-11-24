import { Rule } from './types';

export const defaultConfig: Rule[] = [
  {
    validation: 'camelCase',
    patterns: ['**/*'],
  },
  {
    validation: 'ignore',
    patterns: [
      'README.md',
      'Dockerfile',
      'LICENSE.md',
      'customTypings/*',
      'typings/*',
    ],
  },
];
