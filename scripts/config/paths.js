const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    clientBuild: resolveApp('docker/prod/build/client'),
    serverBuild: resolveApp('docker/prod/build/server'),
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    srcClient: resolveApp('src/client/web'),
    srcServer: resolveApp('src/client/web/ssr'),
    srcShared: resolveApp('src/client/web/app'),
    publicPath: '/static/',
};

paths.resolveModules = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    paths.src,
    'node_modules',
];

module.exports = paths;
