const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/auth'),
  },
  module: {
    // rules: [
    //   {
    //     test: /\.tsx?$/,
    //     loader: 'ts-loader',
    //     options: {
    //       getCustomTransformers: (program) => ({
    //         before: [
    //           require('@nestjs/swagger/plugin').before(
    //             { classValidatorShim: false, introspectComments: true },
    //             program
    //           ),
    //         ],
    //       }),
    //     },
    //   },
    // ],
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
