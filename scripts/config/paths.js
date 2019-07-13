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
    srcBackEndModules: resolveApp('src/server/node_modules'),
    srcFrontEndModules: resolveApp('src/client/web/node_modules'),
    srcFrontEndChatModules: resolveApp('src/client/web/app/containers/chat/node_modules'),
    publicPath: '/static/',
};

paths.resolveModules = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    paths.src,
    paths.srcBackEndModules,
    paths.srcFrontEndModules,
    paths.srcFrontEndChatModules,
    'node_modules',
];

module.exports = paths;
