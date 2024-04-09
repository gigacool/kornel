import typescript from '@rollup/plugin-typescript';

export default {
  input: 'sources/kornel.ts',
  output: [
    {
      file: 'dist/kornel.js',
      format: 'esm', 
      name: 'Kornel',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(), // Use the TypeScript plugin
  ],
};
