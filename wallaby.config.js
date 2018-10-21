module.exports = function (wallaby) {
    return {
        files: [
            'tsconfig.json',
            'package.json',
            { pattern: 'src/server/**/*.ts', load: false },
            { pattern: 'src/server/**/*.spec.ts', ignore: true },
            { pattern: 'src/client/**/*.js', load: false },
            { pattern: 'src/client/**/*.test.js', ignore: true }
        ],
        tests: [
            { pattern: 'src/server/**/*.spec.ts' },
            { pattern: 'src/client/**/*.test.js' },
        ],
        env: {
            type: 'node',
            runner: 'node'
        },
        compilers: {'src/client/**/*.js': wallaby.compilers.babel()},
        testFramework: 'jest',
        debug: true
    };
};
  