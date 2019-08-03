/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
/* eslint-disable no-tabs */
const omegaPackager = require('./scripts/omega-packager');

module.exports = plop => {
	omegaPackager.generateContainer(plop);
	omegaPackager.generateWebComponent(plop);
	omegaPackager.generateSharedComponent(plop);
	omegaPackager.generateMobileComponent(plop);
};
