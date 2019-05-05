const chalk = require('chalk');

const logMessage = (message, level = 'info') => {
    const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

const compilerPromise = (compiler) => {
    return new Promise((resolve, reject) => {
        compiler.hooks.done.tap('done', (stats) => {
            if (!stats.hasErrors()) {
                return resolve();
            }
            return reject(stats);
        });
    });
};

module.exports = {
    logMessage,
    compilerPromise,
};
