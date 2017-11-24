import { Rule } from './types';

export const defaultConfig: { rules: Rule[] } = {
  rules: [
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
  ],
};
