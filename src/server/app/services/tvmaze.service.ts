// Library
import fetch from 'node-fetch';
import { replace, chain, orderBy } from 'lodash';

export class TvMazeService {
  static transformProxyData(proxyResData) {
    const data = JSON.parse(proxyResData.toString('utf8'));
    if (data.length) {
      data.map((values) => {
        values._links.self.href = values._links.self.href.replace('api.tvmaze.com', 'localhost:3000/proxy');
        values._links.previousepisode.href = values._links.previousepisode.href.replace(
          'api.tvmaze.com',
          'localhost:3000/proxy',
        );
        return values;
      });
    }
    else {
      data._links.self.href = data._links.self.href.replace('api.tvmaze.com', 'localhost:3000/proxy');
      if (data && data._links && data._links.previousepisode && data._links.previousepisode.href) {
        data._links.previousepisode.href = data._links.previousepisode.href.replace(
          'api.tvmaze.com',
          'localhost:3000/proxy',
        );
      }
    }

    return JSON.stringify(data);
  }
}
