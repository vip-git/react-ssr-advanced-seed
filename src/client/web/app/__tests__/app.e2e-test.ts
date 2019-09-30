/* eslint-disable */
/* ignore coverage */
const puppeteer = require('puppeteer');

import { config } from '../../../../../e2e.config';

// Default variables
let browser;
let page;

/* ignore coverage */
describe('Test app works', () => {
	beforeAll(async () => {
		browser = await puppeteer.launch(config.PUPETEER_CONIFG);

		page = await browser.newPage();

		page.emulate({
			viewport: {
				width: 500,
				height: 2400
			},
			userAgent: ''
		});

		await page.goto(config.SITE_URL);
		await page.waitForSelector('h6');
	});

	test('h6 loads correctly', async () => {
		const html = await page.$eval('h6', e => e.innerText);
		expect(html).toBe('Welcome to React-SSR-Advanced Seed Demo');
	}, 16000);

	afterAll(() => {
		browser.close();
	});
});
