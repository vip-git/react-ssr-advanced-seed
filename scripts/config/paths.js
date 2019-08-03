const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const lernaPackages = {
	containers: {
		webContainers: [
			{
				chat: resolveApp('src/client/web/app/containers/chat'),
				login: resolveApp('src/client/web/app/containers/login')
			}
		],
		mobileContainers: [
			{
				chat: resolveApp('src/client/mobile/app/containers/chat'),
				login: resolveApp('src/client/mobile/app/containers/login')
			}
		]
	},
	components: {
		webComponents: [
			{
				'chat-box': resolveApp('src/client/web/app/common/components/chat-box'),
				'doc-gen': resolveApp('src/client/web/app/common/components/doc-gen'),
				wrapper: resolveApp('src/client/web/app/common/components/wrapper'),
				dialog: resolveApp('src/client/web/app/common/components/dialog')
			}
		],
		mobileComponents: [{

        }],
		sharedComponents: [{
            content: resolveApp('src/client/shared/components/content'),
        }]
	},
	rules: resolveApp('src/client/shared/rules'),
	services: resolveApp('src/client/shared/services'),
	state: [
		{
			chat: resolveApp('src/client/shared/rules'),
			login: resolveApp('src/client/shared/rules')
		}
	],
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
