/* eslint-disable global-require */
/* eslint-disable func-names */
// Setup Env variables
module.exports = function (wallaby) {
  return {
    files: [
      'tsconfig.json',
      'package.json',
      'jest.frontend.config.js',
      'babel.config.js',
      { pattern: './scripts/config/**' },
      {
        pattern: 'src/client/**/node_modules/!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)/**',
        ignore: true,
      },
      {
        pattern: 'src/server/**/node_modules/!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)/**',
        ignore: true,
      },
      'src/**/*.+(sass|scss|jpg|jpeg|gif|png|svg)',
      { pattern: 'src/server/**/*.ts', load: false },
      { pattern: 'src/server/**/*.spec.ts', ignore: true },
      { pattern: 'src/client/**/*.js', load: false },
      { pattern: 'src/client/**/*.ts', load: false },
      { pattern: 'src/client/**/*.tsx', load: false },
      { pattern: 'src/client/**/*.json', load: false },
      { pattern: 'src/client/**/*.test.ts', ignore: true },
      { pattern: 'src/client/**/*.spec.ts', ignore: true },
      { pattern: 'src/client/**/__tests__/*.test.tsx', ignore: true },
      { pattern: 'src/client/**/__tests__/*.spec.tsx', ignore: true },
      { pattern: './scripts/config/webpack.config.js/**', ignore: true },
      { pattern: './scripts/config/jest/puppeteer/**', ignore: true },
      { pattern: './scripts/config/jest/cssTransform.js', ignore: true },
      { pattern: './scripts/config/jest/fileTransform.js', ignore: true },
      { pattern: './scripts/config/env.js', ignore: true },
    ],
    tests: [
      { pattern: 'src/server/**/*.spec.ts' },
      { pattern: 'src/client/**/__tests__/*.spec.ts' },
      { pattern: 'src/client/**/__tests__/*.spec.tsx' },
      { pattern: 'src/client/**/__tests__/*.test.ts' },
      { pattern: 'src/client/**/__tests__/*.test.tsx' },
      {
        pattern: 'src/client/**/node_modules/**',
        ignore: true,
      },
      {
        pattern: 'src/server/**/node_modules/**',
        ignore: true,
      },
    ],
    env: {
      type: 'node',
      runner: 'node',
    },
    compilers: { 
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
      'src/client/**/*.js': wallaby.compilers.babel(),
    },
    setup(wallabyJS) {
      const jestConfig = require('./package').jest || require('./jest.frontend.config');
      jestConfig.transform = { '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub' };
      // Modules
      /**
       * @omega-web-containers/chat
       * @omega-web-components/chat-box
       * @omega-web-components/dialog
       * @omega-web-components/doc-gen
       * @omega-web-components/wrapper
       * @omega-shared-components/content
       * @omega-core/services
       * @omega-state-machines/chat
       * @omega-core/rules
       * @omega-core/utils
       * @omega-core/assets
       * omega-mobile
       * omega-web
        '^@omega-web-containers/(*)$': '<rootDir>/client/web/app/containers/$1',
       */
      // jestConfig.moduleNameMapper = {
      //   'omega-mobile': '<rootDir>/client/mobile',
      //   'omega-web': '<rootDir>/client/web',
      //   '@omega-web-containers/chat': '<rootDir>/client/web/app/containers/chat',
      //   '@omega-web-components/chat-box': '<rootDir>/client/web/app/common/components/chat-box',
      //   '@omega-web-components/dialog': '<rootDir>/client/web/app/common/components/dialog',
      //   '@omega-web-components/doc-gen': '<rootDir>/client/web/app/common/components/docgen',
      //   '@omega-web-components/wrapper': '<rootDir>/client/web/app/common/components/wrapper',
      //   '@omega-shared-components/content': '<rootDir>/client/shared/common/components/content',
      //   '@omega-state-machines/chat': '<rootDir>/client/shared/state/containers/chat',
      //   '@omega-core/rules': '<rootDir>/client/shared/rules',
      //   '@omega-core/utils': '<rootDir>/client/shared/utils',
      //   '@omega-core/assets': '<rootDir>/client/shared/assets',
      //   '@omega-core/services': '<rootDir>/client/shared/services',
      // };
      wallabyJS.testFramework.configure(jestConfig);
    },
    testFramework: 'jest',
    debug: true,
  };
};
