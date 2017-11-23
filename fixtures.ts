const filenames = [
  // dot file
  '.dockerignore',

  // dot folder
  '.elasticbeanstalk/config.yml',

  // Capital letter, no extension
  'Dockerfile',

  // Capital letter, no extension, with dash
  'Dockerfile-dev',

  // All caps with extension
  'README.md',

  // All lower case
  'build.js',
  'commonconfig.js',
  'database.rules.json',

  // Snake case
  'docker-compose.yml',

  // All lower case (secrets/ path)
  'secrets/sumo.json.d.ts',
  'secrets/sumo.json.enc',

  // Dot file (src/app/)
  'src/app/.babelrc',

  // Begin with underscore (src/app/)
  'src/app/_variables.scss',

  // camelCase (src/app/)
  'src/app/clientEntry.ts',

  // Pascal case (src/app/components/)
  'src/app/components/App/App.global.scss',
  'src/app/components/App/App.module.scss',
  'src/app/components/NavBar/NavBar.module.scss',
  'src/app/components/NavBar/NavBar.tsx',

  // Snake case (src/typings/)
  'src/typings/shrink-ray.d.ts',
  'src/typings/webpack-hot-server-middleware.d.ts',
];

export const testCase1 = [
  {
    input: {
      filenames,
      rules: [
        {
          validation: 'camelCase',
          patterns: ['**/*'],
        },
        {
          validation: 'PascalCase',
          patterns: ['src/app/components/**/*.tsx'],
        },
        {
          validation: 'ignore',
          patterns: [
            '*/**/typings/*',
            '_*.scss',
            'Dockerfile*',
            'docker-compose.yml',
            '**/LICENSE.md',
            '**/README.md',
          ],
        },
      ],
    },
    results: [['']],
  },
];
