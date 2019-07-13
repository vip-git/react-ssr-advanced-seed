// Services
import { TvMazeService } from '../tvmaze.service';

// Mocks
import { showData } from './mocks/show-data.mocks';
import { singleShowData } from './mocks/single-show-data.mocks';

describe('TvMazeService', () => {
  describe('transformProxyData', () => {
    it('should return an array of show data', async () => {
      const mockedShowData = JSON.stringify(showData);
      const getTransformedData = JSON.parse(TvMazeService.transformProxyData(mockedShowData));
      const expectedData = [
        {
          _links: {
            self: {
              href: 'http://localhost:3000/proxy/shows/1',
            },
            previousepisode: {
              href: 'http://localhost:3000/proxy/episodes/185054',
            },
          },
        },
      ];
      expect(getTransformedData).toBeDefined();
      expect(getTransformedData[0]._links).toEqual(expectedData[0]._links);
    });
    it('should return an object of single show data', async () => {
      const mockedSingleShowData = JSON.stringify(singleShowData);
      const getTransformedData = JSON.parse(TvMazeService.transformProxyData(mockedSingleShowData));
      const expectedData = {
        _links: {
          self: {
            href: 'http://localhost:3000/proxy/shows/1',
          },
          previousepisode: {
            href: 'http://localhost:3000/proxy/episodes/185054',
          },
        },
      };
      expect(getTransformedData).toBeDefined();
      expect(getTransformedData._links).toEqual(expectedData._links);
    });
  });
});
