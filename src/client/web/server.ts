/* tslint:disable:no-string-literal */
// Library
import express from 'express';
import cors from 'cors';
import path from 'path';
import chalk from 'chalk';
import manifestHelpers from 'express-manifest-helpers-audit-fix';
import bodyParser from 'body-parser';
import { configureStore } from '../shared/state';
import serverRender from './ssr/render';
import paths from '../../../scripts/config/paths';
/* ignore coverage */
require('dotenv').config();
/* ignore coverage */
const app = express();
/* ignore coverage */
// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
  app.use('/favicon.ico', (req, res) => {
    res.send('');
  });
}
/* ignore coverage */
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
}));
/* ignore coverage */
app.use(bodyParser.json());
/* ignore coverage */
app.use((req: any, res, next) => {
  req.store = configureStore();
  return next();
});
/* ignore coverage */
const manifestPath = path.join(paths.clientBuild, paths.publicPath);
/* ignore coverage */
app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  }),
);
/* ignore coverage */
app.use(serverRender());
/* ignore coverage */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) =>
  res.status(404).json({
    status: 'error',
    message: err.message,
    stack:
			// print a nicer stack trace by splitting line breaks and making them array items
			process.env.NODE_ENV === 'development' &&
			(err.stack || '')
			  .split('\n')
			  .map(line => line.trim())
			  .map(line => line.split(path.sep).join('/'))
			  .map(line =>
			    line.replace(
			      process
			        .cwd()
			        .split(path.sep)
			        .join('/'),
			      '.',
			    ),
			  ),
  }),
);
/* ignore coverage */
app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`),
  );
});

export default app;
/* ignore coverage */
export const test = 'FOO';
