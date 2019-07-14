// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../../__mocks__/db-connection.mock';

// Shared
import { CatsResolvers } from '../cats.resolvers';
import { CatsService } from '../../shared/cats.service';

describe('CatsResolvers', () => {
	let catsResolver: CatsResolvers;
	let catsService: CatsService;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		catsService = module.get<CatsService>(CatsService);
		catsResolver = new CatsResolvers(catsService);
	});

	describe('getCats', () => {
		it('should return an array of cats', async () => {
			const getCats = await catsResolver.getCats();
			expect(getCats).toBeDefined();
			expect(getCats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should return an array of cats', async () => {
			const mockedCatData = {
				id: 1,
				age: 2,
				name: 'test',
				breed: 'ere'
			};
			const createCat = await catsResolver.create(
				null,
				mockedCatData,
				null,
				null
			);
			expect(createCat).toBeDefined();
			expect(createCat).toHaveProperty('age', 2);
			expect(createCat).toHaveProperty('name', 'test');
			expect(createCat).toHaveProperty('breed', 'ere');
		});
		it('should be able to call catCreated', async () => {
			const catCreated = await catsResolver.catCreated();
			expect(catCreated).toBeDefined();
		});
	});

	describe('findOneById', () => {
		it('should return an array of cats', async () => {
			const getSingleCat = await catsResolver.findOneById(
				null,
				{ id: 1 },
				null,
				null
			);
			expect(getSingleCat).toBeDefined();
			expect(getSingleCat).toHaveProperty('age', 2);
			expect(getSingleCat).toHaveProperty('name', 'test');
			expect(getSingleCat).toHaveProperty('breed', 'ere');
		});
	});
});
