/* eslint-disable */
/* ignore coverage */
const faker = require('faker');
/* ignore coverage */
const puppeteer = require('puppeteer');
/* ignore coverage */
const person = {
	name: `${faker.name.firstName()} ${faker.name.lastName()}`,
	email: faker.internet.email(),
	phone: faker.phone.phoneNumber(),
	message: faker.random.words(),
};
/* ignore coverage */
describe('H2 Text', () => {
	test('h2 loads correctly', async () => {
		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();

		page.emulate({
			viewport: {
				width: 500,
				height: 2400,
			},
			userAgent: '',
		});

		await page.goto('http://localhost:8500/');
		await page.waitForSelector('h2');

		const html = await page.$eval('h2', e => e.innerText);
		expect(html).toBe('Admin Chat Interface');

		browser.close();
	}, 16000);
});