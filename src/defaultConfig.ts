import { Rule } from './types';

export const defaultConfig2: { rules: Rule[] } = {
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
