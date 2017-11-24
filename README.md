# `@hollowverse/validate-filenames`

You can use this package to validate that the filenames in your git repository
meet your validation rules.

Current validation rules are `camelCase` and `PascalCase`.

## Installation

```bash
yarn global add @hollowverse/validate-filenames
```

## Usage

Go to a git-managed repo and run:

```bash
validate-filenames --config ./path/to/configFile.js
```

When you do that, the tool will retrieve a list of all the filenames under git
control and will validate them based on the rules that you have in your config
file.

## Config file

The config file can be any file that exports a JavaScript module with the format
you see below.

_configFile.js_:

```js
module.exports = {
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
```

Notice that `rules` is an array. Each item in the array is an object with two
properties: `validation` and `patterns`.

#### `validation`

`validation` can be one of three values: `camelCase`, `PascalCase`, or `ignore`.

#### `patterns`

`patterns` is an array of
[glob patterns](https://github.com/isaacs/node-glob#glob-primer) that tells
`validate-filenames` that the validation rule applies to files that fall within
this glob pattern.

#### Rule order

The order of the rules matter. The last rule wins. This allows us to have
general rules and override those general rules with specific rules for specific
paths. In the example above, we're saying all filenames within our repo should
be camelCased except for certain files which should be ignored.
