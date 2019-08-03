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
const incrementAllLernaPackages = (version) => {
    const {
        components: { webComponents, mobileComponents, sharedComponents },
        containers: { webContainers, mobileContainers },
        services,
        rules,
        config,
        utils,
        assets,
     } = paths.lernaPackages;
};


const deployAllLernaPackages = () => {

};
