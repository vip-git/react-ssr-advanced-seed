const webpack = require('webpack');
const rimraf = require('rimraf');

const webpackConfig = require('./config/webpack.config.js')(process.env.NODE_ENV || 'production');
const paths = require('./config/paths');
const { logMessage, compilerPromise } = require('./utils');

const generateStaticHTML = async () => {
    const nodemon = require('nodemon');
    const fs = require('fs');
    const chrome = require('chrome-aws-lambda');
    const puppeteer = require('puppeteer-core');

    process.env.PORT = 8500;

    const script = nodemon({
        script: `${paths.serverBuild}/server.js`,
        ignore: ['*'],
    });

    script.on('start', async () => {
        // Only needed inside docker
        // {executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox', '--headless', '--disable-gpu']}
        setTimeout(async function() {
            const browser = await puppeteer.launch({
                args: chrome.args,
                executablePath: await chrome.executablePath,
                headless: chrome.headless,
            });
            const page = await browser.newPage();
            await page.goto(`http://localhost:${process.env.PORT}`);
            const pageContent = await page.content();
            fs.writeFileSync(`${paths.clientBuild}/index.html`, pageContent);
            await browser.close();
            process.exit();
        }, 1500);
    });

    script.on('quit', () => {
        process.exit();
    });

    script.on('error', () => {
        process.exit(1);
    });
};

const build = async () => {
    rimraf.sync(paths.clientBuild);
    rimraf.sync(paths.serverBuild);

    const [clientConfig, serverConfig] = webpackConfig;
    const multiCompiler = webpack([clientConfig, serverConfig]);

    const clientCompiler = multiCompiler.compilers[0];
    const serverCompiler = multiCompiler.compilers[1];

    const clientPromise = compilerPromise(clientCompiler);
    const serverPromise = compilerPromise(serverCompiler);

    serverCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(serverConfig.stats));
            return;
        }
    });

    clientCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(clientConfig.stats));
            return;
        }
    });

    // wait until client and server is compiled
    try {
        await serverPromise;
        await clientPromise;
        await generateStaticHTML();
        logMessage('Done!', 'info');
    } catch (error) {
        logMessage(error, 'error');
    }
};

build();
