/* tslint:disable:mocha-no-side-effect-code mocha-avoid-only */

import { getFilenameValidationData } from './getFilenameValidationData';
// import { testCases } from '../fixtures';

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

  it.only('does not validate components that appear in the pattern', () => {
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
});
