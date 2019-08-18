// Library
const shell = require('shelljs');

// config
const paths = require('../config/paths');

/**
 * Packages to deploy :
 * - src/client/shared/state/containerName/package.json      (deploy)
 * - src/client/web/containers/containerName/package.json    (deploy)
 * - src/client/mobile/containers/containerName/package.json (deploy)
 * - src/client/shared/rules/package.json                    (increment and deploy)
 * - src/client/shared/services/package.json                 (increment and deploy)
 */
const deployAssociatedContainerLernaPackages = (containerName) => {

};

/***
 * Lerna repos
 * - @omega-web-components
 *    - @omega-web-components/chat-box
 *    - @omega-web-components/doc-gen
 *    - @omega-web-components/wrapper
 *    - @omega-web-components/dialog
 * - @omega-mobile-components
 *    -
 * - @omega-web-containers
 *    - @omega-web-containers/chat
 * - @omega-state-machines
 *    - @omega-state-machines/chat
 * - @omega-services
 *    -
 * - @omega-utils
 *    -
 * - @omega-core
 *    - @omega-core/utils
 *    - @omega-core/services
 *    - @omega-core/assets
 *    - @omega-core/rules
 *    - @omega-core/config
 * - @omega-shared-components
 *    - @omega-shared-components/content
 * */
const incrementAllLernaPackages = (newIncrementVersion) => {
    const {
        components: { webComponents, mobileComponents, sharedComponents },
        containers: { webContainers, mobileContainers },
        state,
        services,
        rules,
        config,
        utils,
        assets,
     } = paths.lernaPackages;
     const webComponentsArrayValues = shell
				.ls(webComponents)
                .map(val => webComponents + '/' + val);
     const mobileComponentsArrayValues = shell
				.ls(mobileComponents)
                .map(val => mobileComponents + '/' + val);
     const sharedComponentsArrayValues = shell
				.ls(sharedComponents)
                .map(val => sharedComponents + '/' + val);
     const webContainersArrayValues = shell
				.ls(webContainers)
                .map(val => webContainers + '/' + val);
     const mobileContainersArrayValues = shell
				.ls(mobileContainers)
				.map(val => mobileContainers + '/' + val);
     const stateArrayValues = shell.ls(state).map((val) => state + '/' + val);

     const nonArrayValues = mobileComponentsArrayValues.concat(sharedComponentsArrayValues).concat(webComponentsArrayValues).concat(webContainersArrayValues).concat(mobileContainersArrayValues).concat(stateArrayValues).concat([rules, config, utils, assets, services]);
     const getDirInfo = (index) => {
        const dir = nonArrayValues[index];
        if (dir) {
            shell.cd(dir);
            shell.exec(`node -p "require('./package.json').name"`, (code, stdout, stderr) => {
                shell.exec(`npm version ${newIncrementVersion}`,(code, stdout, stderr) => {
                    shell.exec(`npm publish --access public`,(code, stdout, stderr) => {
                        getDirInfo(index+1);
                    });
                });
            });
        }
     };
     getDirInfo(0);
};

const incrementVersion = process.argv.slice(2).length && process.argv.slice(2)[0];
const finalIncrementVersion =
	incrementVersion === 'alpha' ? 'prerelease --preid=alpha' : incrementVersion; 
incrementAllLernaPackages(finalIncrementVersion);
