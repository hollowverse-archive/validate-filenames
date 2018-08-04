# `@hollowverse/validate-filenames` [![Build Status](https://travis-ci.org/hollowverse/validate-filenames.svg?branch=master)](https://travis-ci.org/hollowverse/validate-filenames)

You can use this package to validate that the filenames in your git repository
meet your validation rules.

Current validation rules are `camelCase`, `PascalCase`, and `ignore`.

## Installation

```bash
yarn add @hollowverse/validate-filenames
```

## Add as an npm script

In your `package.json`

```json
{
  "scripts": {
    "validate-filenames": "validate-filenames"
  }
}
```

## Usage

In a git-managed repo run:

```bash
yarn validate-filenames
```

When you do that, the tool will retrieve a list of all the filenames under git
control and will validate them based on the rules that you have in your config
file.

## Config file

You can configure validate-filenames by dropping a file called `validateFilenames.json`
or `validateFilenames.js` at the root of your repo.

validate-filenames can be configured as follows

```json
{
  "rules": [
    {
      "validation": "camelCase",
      "patterns": ["**/*"]
    },
    {
      "validation": "ignore",
      "patterns": [
        "README.md",
        "Dockerfile",
        "LICENSE.md",
        "customTypings/*",
        "typings/*"
      ]
    }
  ]
}
```

If you're using the `js` version of the configurations, you need to export an object such as the above.

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

---

[If you need help or wanna get in touch...](https://github.com/hollowverse/hollowverse/wiki/Help)
