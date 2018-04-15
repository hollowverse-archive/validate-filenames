module.exports = {
  rules: [
    {
      validation: 'camelCase',
      patterns: ['**/*'],
    },
    {
      validation: 'PascalCase',
      patterns: [],
    },
    {
      validation: 'ignore',
      patterns: [
        '*/**/typings/*',
        '__tests__/**/*',
        '**/__tests__/**/*',
        '__mocks__/**/*',
        '**/__mocks__/**/*',
        '**/__snapshots__/**',
        'docker-compose.yml',
        '**/LICENSE',
        '**/README.md',
      ],
    },
  ],
};
