// module.exports = {
//   // Type check TypeScript files
//   '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

//   // Lint & Prettify TS and JS files
//   '**/*.(ts|tsx|js)': filenames => [
//     `yarn eslint ${filenames.join(' ')}`,
//     `yarn prettier --write ${filenames.join(' ')}`
//   ],

//   // Prettify only Markdown and JSON files
//   '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`
// };

module.exports = {
  'src/**/*.(ts|tsx)': () => 'next lint',
  'src/**/*.(ts|tsx)': () => 'tsc --noEmit',
  'src/**/*.(html|css|scss|js|jsx|ts|tsx|mdx)': (filenames) => [
    `prettier --write ${filenames.join(' ')} --cache`
  ]
};