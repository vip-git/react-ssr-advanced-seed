// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../__mocks__/db-connection.mock';

// Shared
import { CatsService } from '../shared/cats.service';

describe('CatsService', () => {
	let catsService: CatsService;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		catsService = module.get<CatsService>(CatsService);
	});

	describe('findAll', () => {
		it('should return an array of cats', async () => {
			const findAllCats = await catsService.findAll();
			expect(findAllCats).toBeDefined();
			expect(findAllCats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should be able to create cat', async () => {
			const mockedCatData = {
				id: 1,
				age: 2,
				name: 'test',
				breed: 'test'
			};
			const createCat = await catsService.create(mockedCatData);
			expect(createCat).toBeDefined();
			expect(createCat).toHaveProperty('age', 2);
			expect(createCat).toHaveProperty('name', 'test');
			expect(createCat).toHaveProperty('breed', 'test');
		});
	});

	describe('findOneById', () => {
		it('should return single cat', async () => {
			const findOneCat = await catsService.findOneById(1);
			expect(findOneCat).toBeDefined();
			expect(findOneCat).toHaveProperty('age', 2);
			expect(findOneCat).toHaveProperty('name', 'test');
			expect(findOneCat).toHaveProperty('breed', 'test');
		});
	});

	describe('update', () => {
		it('should return an array of cats', async () => {
			const mockedCatData = {
				id: 1,
				age: 2,
				name: 'test',
				breed: 'update'
			};
			const updateCat = await catsService.update(1, mockedCatData);
			expect(updateCat).toBeDefined();
			expect(updateCat).toHaveProperty('age', 2);
			expect(updateCat).toHaveProperty('name', 'test');
			expect(updateCat).toHaveProperty('breed', 'update');
		});
	});

	describe('delete', () => {
		it('should return an array of cats', async () => {
			const deletCat = await catsService.delete(1);
			expect(deletCat).toBe(undefined);
		});
	});
});
