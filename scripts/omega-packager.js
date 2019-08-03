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
	publishLernaRepos: () => {
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
	},

	/**
	 * Following steps to generate a container
	 *   - src
	 * 		- web
	 *  	  - containers
	 *          - containerName
	 * 			   - __tests__
	 * 				 - containerName.spec.tsx
	 *             - containerName.components.ts
	 *             - containerName.model.ts
	 *             - index.tsx
	 * 			   - containerName.mobile-container.json
	 *  		   - package.json
	 *  	- shared
	 * 		   - state
	 * 			 - containerName
	 * 			 	- redux
	 * 				  - __tests__
	 * 				  	- containerName-actions.spec.ts
	 * 				  	- containerName-effects.spec.ts
	 * 				  	- containerName-reducer.spec.ts
	 * 				  	- containerName-selectors.spec.ts
	 * 				  - containerName.actions.ts
	 * 				  - containerName.effects.ts
	 * 				  - containerName.reducer.ts
	 * 				  - containerName.selectors.ts
	 * 				- containerName.redux-model.ts
	 * 				- package.json
	 *         - rules
	 * 			  - __tests__
	 * 				- containerName-rules.spec.ts
	 * 			  - containerName.rules.ts
	 * 			  - index.ts
	 * 		   - services
	 * 			  - containerName
	 * 				- chat.gql.ts
	 * 				- index.ts
	 *  	- mobile
	 * 	   	  - containers
	 *          - containerName
	 * 			   - __tests__
	 * 				 - containerName.spec.tsx
	 *             - containerName.components.ts
	 *             - containerName.model.ts
	 *             - index.tsx
	 * 			   - containerName.web-container.json
	 *  		   - package.json
	 */
	generateContainer: plop =>
		plop.setGenerator('container', {
			description: 'React-SSR-Advanced Container generator',
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
	 * Following steps to generate a web component
	 * 	- src
	 * 	  - web
	 * 		- common
	 * 		   - components
	 *         		- componentName
	 * 					- __tests__
	 * 					  - componentName.spec.tsx
	 * 					- componentName.model.ts
	 * 					- componentName.web-component.json
	 * 					- index.tsx
	 * 					- package.json
	 * 					- styles.ts
	 * 					- types.ts
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
	 *    - shared
	 *      - components
	 * 		   - componentName
	 * 			  - __tests__
	 * 			    - componentName.spec.tsx
	 * 			  - componentName.model.ts
	 * 			  - componentName.web-component.json
	 * 			  - index.tsx
	 * 			  - package.json
	 * 			  - styles.ts
	 * 			  - types.ts
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
	 *    - mobile
	 *      - common
	 * 		  - components
	 * 			- componentName
	 * 	  		   - __tests__
	 * 			     - componentName.spec.tsx
	 * 			   - componentName.model.ts
	 * 			   - componentName.web-component.json
	 * 			   - index.tsx
	 * 			   - package.json
	 * 			   - styles.ts
	 * 			   - types.ts
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
