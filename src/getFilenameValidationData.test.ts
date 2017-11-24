import { getFilenameValidationData } from './getFilenameValidationData';
import { filenames } from '../fixtures';

describe('getFilenameValidationData', () => {
  it('returns valid = true when filename is valid', () => {
    expect(
      getFilenameValidationData(
        ['src/app/hello.ts', 'src/app/helloWorld.ts'],
        [
          {
            validation: 'camelCase',
            patterns: ['**/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/hello.ts', { valid: true, invalidComponents: [] }],
      ['src/app/helloWorld.ts', { valid: true, invalidComponents: [] }],
    ]);
  });

  it('returns valid = false and indexes of invalid components when filename is invalid', () => {
    expect(
      getFilenameValidationData(
        ['src/app/hello-world.ts'],
        [
          {
            validation: 'camelCase',
            patterns: ['**/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/hello-world.ts', { valid: false, invalidComponents: [2] }],
    ]);
  });

  it('understands "camelCase"', () => {
    expect(
      getFilenameValidationData(
        ['src/app/helloWorld.ts'],
        [
          {
            validation: 'camelCase',
            patterns: ['**/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/helloWorld.ts', { valid: true, invalidComponents: [] }],
    ]);

    expect(
      getFilenameValidationData(
        ['src/app/HelloWorld.ts'],
        [
          {
            validation: 'camelCase',
            patterns: ['**/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/HelloWorld.ts', { valid: false, invalidComponents: [2] }],
    ]);
  });

  it('understands "PascalCase"', () => {
    expect(
      getFilenameValidationData(
        ['HelloWorld.ts'],
        [
          {
            validation: 'PascalCase',
            patterns: ['**/*'],
          },
        ],
      ),
    ).toEqual([['HelloWorld.ts', { valid: true, invalidComponents: [] }]]);

    expect(
      getFilenameValidationData(
        ['helloWorld.ts'],
        [
          {
            validation: 'PascalCase',
            patterns: ['**/*'],
          },
        ],
      ),
    ).toEqual([['helloWorld.ts', { valid: false, invalidComponents: [0] }]]);
  });

  it('does not validate components that appear in the pattern', () => {
    expect(
      getFilenameValidationData(
        ['src/app/HelloWorld.ts'],
        [
          {
            validation: 'PascalCase',
            patterns: ['src/app/**/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/HelloWorld.ts', { valid: true, invalidComponents: [] }],
    ]);

    expect(
      getFilenameValidationData(
        ['src/app/helloWorld.ts'],
        [
          {
            validation: 'PascalCase',
            patterns: ['src/app/**/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/helloWorld.ts', { valid: false, invalidComponents: [2] }],
    ]);
  });

  it('consolidates pattern components correctly when it ignores filename components in the pattern', () => {
    expect(
      getFilenameValidationData(
        ['src/app/pages/NavBar/NavBar.module.scss'],
        [
          {
            validation: 'PascalCase',
            patterns: ['src/app/components/**/*', 'src/app/pages/**/*'],
          },
        ],
      ),
    ).toEqual([
      [
        'src/app/pages/NavBar/NavBar.module.scss',
        { valid: true, invalidComponents: [] },
      ],
    ]);
  });

  it('complains about camelCase or PascalCase that have two consecutive uppercase letters', () => {
    expect(
      getFilenameValidationData(
        ['src/app/helloWOrld.ts'],
        [
          {
            validation: 'camelCase',
            patterns: ['**/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/helloWOrld.ts', { valid: false, invalidComponents: [2] }],
    ]);

    expect(
      getFilenameValidationData(
        ['src/app/HelloWOrld.ts'],
        [
          {
            validation: 'PascalCase',
            patterns: ['src/app/*'],
          },
        ],
      ),
    ).toEqual([
      ['src/app/HelloWOrld.ts', { valid: false, invalidComponents: [2] }],
    ]);
  });

  it('works for `camelCase` alone', () => {
    expect(
      getFilenameValidationData(filenames, [
        {
          validation: 'camelCase',
          patterns: ['**/*'],
        },
      ]),
    ).toMatchSnapshot();
  });

  it('works when we ignore certain patterns', () => {
    expect(
      getFilenameValidationData(filenames, [
        {
          validation: 'camelCase',
          patterns: ['**/*'],
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
      ]),
    ).toMatchSnapshot();
  });

  it('works when we specify different validation rules for different paths', () => {
    expect(
      getFilenameValidationData(filenames, [
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
      ]),
    ).toMatchSnapshot();
  });

  it('works when we fine-tune the rules for the filenames so everything is valid', () => {
    expect(
      getFilenameValidationData(filenames, [
        {
          validation: 'camelCase',
          patterns: ['**/*'],
        },

        {
          validation: 'PascalCase',
          patterns: ['src/app/components/**/*', 'src/app/pages/**/*'],
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
      ]),
    ).toMatchSnapshot();
  });
});
