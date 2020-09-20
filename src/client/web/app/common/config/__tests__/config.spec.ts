// config
import { webConfig } from '../';

describe('Webconfig', () => {
    it('should have following values', () => {
        expect(webConfig.languages).toMatchObject([
            {
                name: 'French',
                value: 'fr-FR'
            },
            {
                name: 'Deutsch',
                value: 'de-DE'
            },
            {
                name: 'English',
                value: 'en-US'
            }
        ]);
    });
});