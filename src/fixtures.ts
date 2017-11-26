export const filenames = [
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
  'src/app/components/App/App.tsx',

  // Pascal case (src/app/pages)
  'src/app/pages/NavBar/NavBar.module.scss',
  'src/app/pages/NavBar/NavBar.tsx',

  // Snake case (src/typings/)
  'src/typings/shrink-ray.d.ts',
  'src/typings/webpack-hot-server-middleware.d.ts',
];
