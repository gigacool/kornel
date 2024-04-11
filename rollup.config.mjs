import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts'

export default [
  {
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
  },
  {
    input: './dist/dts/kornel.d.ts',
    output: [{ file: 'dist/kornel.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
  ;
