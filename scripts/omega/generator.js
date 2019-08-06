/***
 * This is the first iteration of omega packager.
 * ------------------
 * Todo:            |
 * ------------------
 * - Give the possiblity of packaging a container based on given model file.
 *  - omega package webChatContainer --container
 *  - omega package webChatComponent --component
 * - Give the possiblity to unpackage a container based on given json file.
 *
 * Tasks:
 * - Read web container json and scafold a container
 * - Read web component json and scafold a component
 * - Read libraries from each json and do npm install with their specified version
 * - Symlink internal components so they can be imported and packaged externally.
 */
module.exports = {
	/**
	 * Following steps to generate a container
	 *   - src
	 * 		- client
	 * 			- web
	 *  		  - containers
	 *      	    - containerName
	 * 				   - __tests__
	 * 					 - containerName.spec.tsx
	 *      	       - containerName.components.ts
	 *      	       - containerName.model.ts
	 *      	       - index.tsx
	 * 				   - containerName.web-container.json
	 *  			   - package.json
	 *  		- shared
	 * 			   - state
	 * 				 - containerName
	 * 				 	- redux
	 * 					  - __tests__
	 * 					  	- containerName-actions.spec.ts
	 * 					  	- containerName-effects.spec.ts
	 * 					  	- containerName-reducer.spec.ts
	 * 					  	- containerName-selectors.spec.ts
	 * 					  - containerName.actions.ts
	 * 					  - containerName.effects.ts
	 * 					  - containerName.reducer.ts
	 * 					  - containerName.selectors.ts
	 * 					- containerName.redux-model.ts
	 * 					- package.json
	 *      	   - rules
	 * 				  - __tests__
	 * 					- containerName-rules.spec.ts
	 * 				  - containerName.rules.ts
	 * 				  - package.json
	 * 				  - index.ts
	 * 			   - services
	 * 				  - containerName
	 * 					- chat.gql.ts
	 * 					- index.ts
	 *  		- mobile
	 * 	   		  - containers
	 *      	    - containerName
	 * 				   - __tests__
	 * 					 - containerName.spec.tsx
	 *      	       - containerName.components.ts
	 *      	       - containerName.model.ts
	 *      	       - index.tsx
	 * 				   - containerName.mobile-container.json
	 *  			   - package.json
	 **/
	generateContainer: plop =>
		plop.setGenerator('container', {
			description: 'React-SSR-Advanced Container generator',
			prompts: [
				{
					type: 'input',
					name: 'containerName',
					message: 'Container Name Please'
				}
			],
			actions: [
				// Container folder starts here
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/index.tsx',
					templateFile: 'scripts/plopTemplates/src/web/container/index.tsx.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.model.ts',
					templateFile:
						'scripts/plopTemplates/src/web/container/containerName.model.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.components.ts',
					templateFile:
						'scripts/plopTemplates/src/web/container/containerName.components.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.web-container.json',
					templateFile:
						'scripts/plopTemplates/src/web/container/containerName.web-container.json.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/package.json',
					templateFile:
						'scripts/plopTemplates/src/web/container/package.json.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/__tests__/{{containerName}}-container.spec.tsx',
					templateFile:
						'scripts/plopTemplates/src/web/container/__tests__/containerName.spec.tsx.hbs'
				},
				// Container folder ends here
				// State folder starts here
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/{{containerName}}.redux-model.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/containerName.redux-model.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/package.json',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/package.json.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/redux/{{containerName}}.actions.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/redux/containerName.actions.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/redux/{{containerName}}.effects.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/redux/containerName.effects.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/redux/{{containerName}}.reducer.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/redux/containerName.reducer.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/redux/{{containerName}}.selectors.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/redux/containerName.selectors.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/redux/__tests__/{{containerName}}-effects.spec.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/redux/__tests__/containerName-effects.spec.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/redux/__tests__/{{containerName}}-reducer.spec.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/redux/__tests__/containerName-reducer.spec.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/state/containers/{{containerName}}/redux/__tests__/{{containerName}}-selectors.spec.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/state/container/redux/__tests__/containerName-selectors.spec.ts.hbs'
				},
				// State folder ends here
				// rules folder starts here
				{
					type: 'add',
					path: 'temp/src/client/shared/rules/{{containerName}}.rules.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/rules/containerName.rules.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/rules/__tests__/{{containerName}}-rules.spec.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/rules/__tests__/containerName-rules.spec.ts.hbs'
				},
				// rules folder ends here
				// services folder starts here
				{
					type: 'add',
					path:
						'temp/src/client/shared/services/{{containerName}}/{{containerName}}.gql.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/services/container/containerName.gql.ts.hbs'
				},
				{
					type: 'add',
					path: 'temp/src/client/shared/services/{{containerName}}/index.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/services/container/index.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/services/{{containerName}}/__tests__/{{containerName}}-service.spec.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/services/container/__tests__/index-spec.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/shared/services/{{containerName}}/__tests__/{{containerName}}-gql.spec.ts',
					templateFile:
						'scripts/plopTemplates/src/shared/services/container/__tests__/containerName-gql.spec.ts.hbs'
				},
				// services folder ends here
				// mobile container starts here
				{
					type: 'add',
					path:
						'temp/src/client/mobile/app/containers/{{containerName}}/index.tsx',
					templateFile:
						'scripts/plopTemplates/src/mobile/container/index.tsx.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/mobile/app/containers/{{containerName}}/{{containerName}}.model.ts',
					templateFile:
						'scripts/plopTemplates/src/mobile/container/containerName.model.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/mobile/app/containers/{{containerName}}/{{containerName}}.components.ts',
					templateFile:
						'scripts/plopTemplates/src/mobile/container/containerName.components.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/mobile/app/containers/{{containerName}}/{{containerName}}.mobile-container.json',
					templateFile:
						'scripts/plopTemplates/src/mobile/container/containerName.mobile-container.json.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/mobile/app/containers/{{containerName}}/package.json',
					templateFile:
						'scripts/plopTemplates/src/mobile/container/package.json.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/mobile/app/containers/{{containerName}}/__tests__/{{containerName}}-container.spec.tsx',
					templateFile:
						'scripts/plopTemplates/src/mobile/container/__tests__/containerName.spec.tsx.hbs'
				}
				// mobile container ends here
			]
		}),

	/**
	 * Following steps to generate a web component
	 * 	- src
	 *    - client
	 * 	  	- web
	 * 			- common
	 * 			   - components
	 *    	     		- componentName
	 * 						- __tests__
	 * 						  - componentName.spec.tsx
	 * 						- componentName.model.ts
	 * 						- componentName.web-component.json
	 * 						- index.tsx
	 * 						- package.json
	 * 						- styles.ts
	 * 						- types.ts
	 */
	generateWebComponent: plop =>
		plop.setGenerator('webComponent', {
			description: 'React-SSR-Advanced Web Component generator',
			prompts: [
				{
					type: 'input',
					name: 'containerName',
					message: 'container name please'
				}
			],
			actions: [
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{dashCase containerName}}.scss',
					templateFile: 'templates/BasicComponent/BasicComponent.scss.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.model.ts',
					templateFile: 'templates/BasicComponent/BasicComponent.test.ts.hbs'
				},
				{
					type: 'add',
					path: 'temp/src/client/web/app/containers/{{containerName}}/index.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.actions.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.effects.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.reducer.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.rules.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				}
			]
		}),

	/**
	 * Following steps to generate a shared component
	 *    - src
	 *    	- client
	 *    		- shared
	 *    		  - components
	 * 				   - componentName
	 * 					  - __tests__
	 * 					    - componentName.spec.tsx
	 * 					  - componentName.model.ts
	 * 					  - componentName.web-component.json
	 * 					  - index.tsx
	 * 					  - package.json
	 * 					  - styles.ts
	 * 					  - types.ts
	 */
	generateSharedComponent: plop =>
		plop.setGenerator('sharedComponent', {
			description: 'React-SSR-Advanced Shared Component generator',
			prompts: [
				{
					type: 'input',
					name: 'containerName',
					message: 'container name please'
				}
			],
			actions: [
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{dashCase containerName}}.scss',
					templateFile: 'templates/BasicComponent/BasicComponent.scss.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.model.ts',
					templateFile: 'templates/BasicComponent/BasicComponent.test.ts.hbs'
				},
				{
					type: 'add',
					path: 'temp/src/client/web/app/containers/{{containerName}}/index.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.actions.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.effects.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.reducer.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.rules.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				}
			]
		}),

	/**
	 * Following steps to generate a mobile component
	 *    - src
	 * 		- client
	 * 			- mobile
	 *      		- common
	 * 				  - components
	 * 					- componentName
	 * 	  				   - __tests__
	 * 					     - componentName.spec.tsx
	 * 					   - componentName.model.ts
	 * 					   - componentName.web-component.json
	 * 					   - index.tsx
	 * 					   - package.json
	 * 					   - styles.ts
	 * 					   - types.ts
	 */
	generateMobileComponent: plop =>
		plop.setGenerator('mobileComponent', {
			description: 'React-SSR-Advanced Mobile Component generator',
			prompts: [
				{
					type: 'input',
					name: 'containerName',
					message: 'container name please'
				}
			],
			actions: [
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{dashCase containerName}}.scss',
					templateFile: 'templates/BasicComponent/BasicComponent.scss.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/{{containerName}}.model.ts',
					templateFile: 'templates/BasicComponent/BasicComponent.test.ts.hbs'
				},
				{
					type: 'add',
					path: 'temp/src/client/web/app/containers/{{containerName}}/index.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.actions.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.effects.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.reducer.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				},
				{
					type: 'add',
					path:
						'temp/src/client/web/app/containers/{{containerName}}/redux/{{containerName}}.rules.ts',
					templateFile: 'scripts/plopTemplates/container.ts.hbs'
				}
			]
		})
};