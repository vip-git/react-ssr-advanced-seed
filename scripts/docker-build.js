const shell = require('shelljs');
const dockerBuild = process.argv.slice(2).length && process.argv.slice(2)[0];
const dockerName = 'react-ssr-docker-' + dockerBuild;
const dockerImage = `vipgit/react-ssr-${dockerBuild}:${process.env.npm_package_version}`;
const dockerPortMapping = dockerBuild === 'frontend' ? '8080:80' : '8090:8090';
const dockerNetwork =
	dockerBuild === 'frontend' ? '' : '--network postgres-network';

// docker network create --driver bridge postgres-network

shell.cd(`./docker/${dockerBuild}/prod`);

function getDockerContainerId(callback) {
	shell.exec('docker rm ' + dockerName + ' --force', function(
		code,
		stdout,
		stderr
	) {
		shell.exec(
			`docker run -d -p ${dockerPortMapping} --name=${dockerName} ${dockerNetwork} ${dockerImage}`,
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
