/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
/* eslint-disable no-tabs */
const recursivePrompt = require('inquirer-recursive');
const omegaGenerator = require('./scripts/omega/generator');

module.exports = plop => {
	plop.addPrompt('recursive', recursivePrompt);
	omegaGenerator.generateContainer(plop);
	omegaGenerator.generateWebComponent(plop);
	omegaGenerator.generateSharedComponent(plop);
	omegaGenerator.generateMobileComponent(plop);
	omegaGenerator.generateCustomServerActions(plop);
	omegaGenerator.generateServerModule(plop);
	omegaGenerator.generateServerModelHelpers(plop);
};
