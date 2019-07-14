// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../__mocks__/db-connection.mock';

// Shared
import { CatsController } from '../rest/cats.controller';

describe('CatsController', () => {
	let catsController: CatsController;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		catsController = module.get<CatsController>(CatsController);
	});

	describe('findAll', () => {
		it('should return an array of cats', async () => {
			const allCats = await catsController.findAll();
			expect(allCats).toBeDefined();
			expect(allCats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should return created cat', async () => {
			const mockedCatData = {
				id: 1,
				age: 2,
				name: 'test',
				breed: 'ere'
			};
			const createCat = await catsController.create(mockedCatData);
			expect(createCat).toBeDefined();
			expect(createCat).toHaveProperty('age', 2);
			expect(createCat).toHaveProperty('name', 'test');
			expect(createCat).toHaveProperty('breed', 'ere');
		});
	});

	describe('findOne', () => {
		it('should return single', async () => {
			const getSingleCat = await catsController.findOne('1');
			expect(getSingleCat).toBeDefined();
			expect(getSingleCat).toHaveProperty('age', 2);
			expect(getSingleCat).toHaveProperty('name', 'test');
			expect(getSingleCat).toHaveProperty('breed', 'ere');
		});
	});
});
