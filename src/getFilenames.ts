import * as shelljs from 'shelljs';

export function getFilenames() {
  // Let's only validate files managed by git
  const { stdout } = shelljs.exec('git ls-files', { silent: true });

  if (typeof stdout === 'string') {
    // remove empty strings from the array and remove files in ignored paths
    return stdout.split('\n').filter(file => file.length !== 0);
  }

  console.error('Unable to read git tree, is this a git repository?');
  shelljs.exit(1);
  return [];
}
