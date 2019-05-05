/* eslint-disable func-names */
/* eslint-disable no-tabs */
module.exports = function (plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'React-Redux Container generator',
    prompts: [
      {
        type: 'input',
        name: 'containerName',
        message: 'container name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/{{containerName}}.js',
        templateFile: 'scripts/plopTemplates/container.js.hbs',
      },
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/{{dashCase containerName}}.scss',
        templateFile: 'templates/BasicComponent/BasicComponent.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/{{containerName}}.model.js',
        templateFile: 'templates/BasicComponent/BasicComponent.test.js.hbs',
      },
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/index.js',
        templateFile: 'scripts/plopTemplates/container.js.hbs',
      },
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/redux/{{containerName}}.actions.js',
        templateFile: 'scripts/plopTemplates/container.js.hbs',
      },
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/redux/{{containerName}}.effects.js',
        templateFile: 'scripts/plopTemplates/container.js.hbs',
      },
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/redux/{{containerName}}.reducer.js',
        templateFile: 'scripts/plopTemplates/container.js.hbs',
      },
      {
        type: 'add',
        path: 'src/client/app/containers/{{containerName}}/redux/{{containerName}}.rules.js',
        templateFile: 'scripts/plopTemplates/container.js.hbs',
      },
    ],
  });
};
