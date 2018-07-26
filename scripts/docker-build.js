const shell = require('shelljs');

shell.cd('./docker/prod');

if (process.argv.slice(2).length && process.argv.slice(2)[0] === '--first') 
{
    shell.exec('docker build -t vipgit/react-ssr-nginx:'+ process.env.npm_package_version +' . && docker run -d -p 8080:80 --name=react-ssr-docker vipgit/react-ssr-nginx:'+ process.env.npm_package_version, function(code, stdout, stderr) {
        console.log('Docker Build Successful - version deployed : vipgit/react-ssr-nginx:'+ process.env.npm_package_version);
    });
} else {
    shell.exec('docker build -t vipgit/react-ssr-nginx:'+ process.env.npm_package_version +' . && docker rm react-ssr-docker --force && docker run -d -p 8080:80 --name=react-ssr-docker vipgit/react-ssr-nginx:'+ process.env.npm_package_version, function(code, stdout, stderr) {
        console.log('Docker Build Successful - version deployed : vipgit/react-ssr-nginx:'+ process.env.npm_package_version);
    });
}
