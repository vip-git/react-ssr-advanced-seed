/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
/* eslint-disable no-tabs */
const omegaGenerator = require('./scripts/omega/generator');

module.exports = plop => {
	omegaGenerator.generateContainer(plop);
	omegaGenerator.generateWebComponent(plop);
	omegaGenerator.generateSharedComponent(plop);
	omegaGenerator.generateMobileComponent(plop);
	omegaGenerator.generateCustomServerActions(plop);
	omegaGenerator.generateServerModule(plop);
};
