// internal
import { HttpService } from '../http.service';

describe('HTTP Service', () => {
    it('can get all chats', async () => {
        const payload = {};
        const restApiCall = await HttpService.buildRestApiCall(
            'api', 'GET', '/cats', 'test', payload
        ).toPromise();
        expect(restApiCall).toBeDefined();
        expect(restApiCall).toStrictEqual({
                message: 'API call failed',
                error: true,
                payload,
        });
    });
});
