// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../__mocks__/db-connection.mock';

// Shared
import { CatsController } from '../rest/cats.controller';

describe('CatsController', () => {
	let catsController: CatsController;
	beforeEach(async () => {
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
});
