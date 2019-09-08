const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const lernaPackages = {
	containers: {
		webContainers: resolveApp('src/client/web/app/containers'),
		mobileContainers: resolveApp('src/client/mobile/app/containers')
	},
	components: {
		webComponents: resolveApp('src/client/web/app/common/components'),
		mobileComponents: resolveApp('src/client/mobile/app/common/components'),
		sharedComponents: resolveApp('src/client/shared/components')
	},
	rules: resolveApp('src/client/shared/rules'),
	services: resolveApp('src/client/shared/services'),
	i18n: resolveApp('src/client/shared/i18n'),
	state: resolveApp('src/client/shared/state/containers'),
	config: resolveApp('src/client/shared/config'),
	assets: resolveApp('src/client/shared/assets'),
	utils: resolveApp('src/client/shared/utils')
};

const paths = {
    clientBuild: resolveApp('docker/frontend/prod/build/client'),
    serverBuild: resolveApp('docker/frontend/prod/build/server'),
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    srcClient: resolveApp('src/client/web'),
    srcServer: resolveApp('src/client/web/ssr'),
    srcShared: resolveApp('src/client/web/app'),
    srcBackEndModules: resolveApp('src/server/node_modules'),
    srcFrontEndModules: resolveApp('src/client/web/node_modules'),
    srcFrontEndChatModules: resolveApp('src/client/web/app/containers/chat/node_modules'),
    publicPath: '/static/',
    lernaPackages,
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
