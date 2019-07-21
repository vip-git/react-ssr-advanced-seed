const shell = require('shelljs');
const dockerName = 'react-ssr-docker';
const dockerImage = 'vipgit/react-ssr-nginx:' + process.env.npm_package_version;
const dockerBuild = process.argv.slice(2).length && process.argv.slice(2)[0];

shell.cd(`./docker/${dockerBuild}/prod`);

function getDockerContainerId(callback) {
	shell.exec('docker rm ' + dockerName + ' --force', function(
		code,
		stdout,
		stderr
	) {
		shell.exec(
			'docker run -d -p 8080:80 --name=' + dockerName + ' ' + dockerImage,
			callback
		);
	});
}

function publishToDockerHub(commitHash, repository, callback) {
	shell.exec('docker commit ' + commitHash + ' ' + repository, function(
		code,
		stdout,
		stderr
	) {
		shell.exec('docker push ' + repository, callback);
	});
}

if (
	process.argv.slice(2).length &&
	process.argv.slice(2).length === 2 &&
	process.argv.slice(2)[1] === '--publish'
) {
	shell.exec('docker build -t ' + dockerImage + ' .', function() {
		getDockerContainerId(function(code, stdout, stderr) {
			publishToDockerHub(stdout, dockerImage, function() {
				console.log(
					'Docker Build Successful - version deployed : ' + dockerImage
				);
			});
		});
	});
} else {
	shell.exec('docker build -t ' + dockerImage + ' .', function(
		code,
		stdout,
		stderr
	) {
		getDockerContainerId(function(code, stdout, stderr) {
			console.log(
				'Docker Build Successful - version running : ' + dockerImage,
				stdout
			);
		});
	});
}
