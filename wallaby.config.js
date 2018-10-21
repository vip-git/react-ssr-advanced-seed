module.exports = function () {
    return {
        files: [
            'tsconfig.json',
            'package.json',
            { pattern: 'src/server/**/*.ts', load: false },
            { pattern: 'src/server/**/*.spec.ts', ignore: true }
        ],
        tests: [
            { pattern: 'src/server/**/*.spec.ts' },
        ],
        env: {
            type: 'node',
            runner: 'node'
        },
        testFramework: 'jest',
        debug: true
    };
};
  